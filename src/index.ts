import { readdir, mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { PDFDocument, rgb } from "pdf-lib";
import React, { type JSX } from "react";
import sharp from "sharp";
import { autoLoadFonts } from "./load-fonts";
import { render } from "./satori";
import { extractAllText } from "./text-extract";

// A4 dimensions in pixels at 300 DPI (high quality print)
// A4 is 210mm x 297mm = 8.27in x 11.69in
const A4_WIDTH = 2480; // ~8.27in * 300dpi
const A4_HEIGHT = 3508; // ~11.69in * 300dpi

interface Page {
    name: string;
    order: number;
    component: () => JSX.Element;
}

async function discoverPages(): Promise<Page[]> {
    const pagesDir = join(__dirname, "pages");
    const files = await readdir(pagesDir);
    
    const pages: Page[] = [];
    
    for (const file of files) {
        if (!file.endsWith(".tsx") && !file.endsWith(".ts")) continue;
        
        // Extract order number from filename (e.g., "1-home.tsx" -> 1)
        const match = file.match(/^(\d+)-/);
        if (!match) continue;
        
        const order = parseInt(match[1], 10);
        const name = file.replace(/^\d+-/, "").replace(/\.tsx?$/, "");
        
        // Dynamic import of the page component
        const module = await import(join(pagesDir, file));
        const component = module.default;
        
        pages.push({ name, order, component });
    }
    
    // Sort by order
    pages.sort((a, b) => a.order - b.order);
    
    return pages;
}

async function renderPages(pages: Page[]): Promise<{ name: string; buffer: Buffer; extractedText: string }[]> {
    const rendered: { name: string; buffer: Buffer; extractedText: string }[] = [];
    
    for (const page of pages) {
        console.log(`Rendering page: ${page.order}-${page.name}`);
        
        const element = React.createElement(page.component);
        
        // Extract text from elements with data-role or className="extract"
        const extractedText = extractAllText(element);
        
        if (extractedText) {
            console.log(`  ✓ Extracted ${extractedText.split('\n').filter(l => l.trim()).length} lines of text for ATS`);
        } else {
            console.log(`  ⚠️  No text extracted - check that elements have data-role or className="extract"`);
        }
        
        const buffer = await render(element, {
            width: A4_WIDTH,
            height: A4_HEIGHT,
            background: "#ffffff",
        });
        
        rendered.push({ 
            name: `${page.order}-${page.name}`, 
            buffer,
            extractedText,
        });
    }
    
    return rendered;
}

async function savePageImages(pages: { name: string; buffer: Buffer; extractedText: string }[]): Promise<void> {
    const outputDir = join(__dirname, "../dist/pages");
    
    // Create output directory
    await mkdir(outputDir, { recursive: true });
    
    for (const page of pages) {
        const outputPath = join(outputDir, `${page.name}.webp`);
        await writeFile(outputPath, page.buffer);
        console.log(`Saved: ${outputPath}`);
        
        // Also save extracted text for debugging
        if (page.extractedText) {
            const textPath = join(outputDir, `${page.name}.txt`);
            await writeFile(textPath, page.extractedText);
            console.log(`Saved extracted text: ${textPath}`);
        }
    }
}

async function createPDF(pages: { name: string; buffer: Buffer; extractedText: string }[]): Promise<void> {
    const pdfDoc = await PDFDocument.create();
    
    for (const page of pages) {
        console.log(`Adding ${page.name} to PDF`);
        
        // Convert WebP to JPEG for PDF embedding
        const jpegBuffer = await sharp(page.buffer)
            .jpeg({ quality: 95 }) // High quality JPEG
            .toBuffer();
        
        // Embed the JPEG image
        const image = await pdfDoc.embedJpg(jpegBuffer);
        
        // Add a page with A4 dimensions (in points: 595x842 for standard A4)
        const pdfPage = pdfDoc.addPage([595, 842]);
        
        // Draw the high-res image to fill the entire page
        pdfPage.drawImage(image, {
            x: 0,
            y: 0,
            width: 595,
            height: 842,
        });
        
        // Embed extracted text as invisible text layer for ATS/CV parsers
        if (page.extractedText) {
            console.log(`Embedding extracted text for ${page.name}`);
            
            // Split text into lines
            const lines = page.extractedText.split("\n");
            
            // Draw text in tiny, white (invisible) font at the bottom of the page
            // This makes it accessible to text extractors but invisible to human readers
            const fontSize = 1; // Extremely small
            const lineHeight = 2;
            let yPosition = 10; // Start from bottom
            
            for (const line of lines) {
                if (line.trim()) {
                    pdfPage.drawText(line.trim(), {
                        x: 5,
                        y: yPosition,
                        size: fontSize,
                        color: rgb(1, 1, 1), // White text (invisible on white background)
                        maxWidth: 585,
                    });
                    yPosition += lineHeight;
                }
            }
        }
    }
    
    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    const outputPath = join(__dirname, "../dist/output.pdf");
    await writeFile(outputPath, pdfBytes);
    console.log(`PDF created: ${outputPath}`);
}

async function main() {
    console.log("🚀 Starting portfolio paper generation...\n");
    
    // Auto-load fonts from fonts directory
    await autoLoadFonts();
    
    // Discover pages
    console.log("📄 Discovering pages...");
    const pages = await discoverPages();
    console.log(`Found ${pages.length} page(s)\n`);
    
    // Render pages to WebP
    console.log("🎨 Rendering pages...");
    const renderedPages = await renderPages(pages);
    console.log();
    
    // Save WebP files
    console.log("💾 Saving WebP files...");
    await savePageImages(renderedPages);
    console.log();
    
    // Create PDF
    console.log("📑 Creating PDF...");
    await createPDF(renderedPages);
    console.log();
    
    console.log("✅ Portfolio paper generated successfully!");
}

main().catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
});
