import { readdir, mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { PDFDocument } from "pdf-lib";
import React, { type JSX } from "react";
import sharp from "sharp";
import { autoLoadFonts } from "./load-fonts";
import { render } from "./satori";

// A4 dimensions in pixels at 72 DPI (standard for web)
// A4 is 210mm x 297mm = 8.27in x 11.69in
const A4_WIDTH = 595; // ~8.27in * 72dpi
const A4_HEIGHT = 842; // ~11.69in * 72dpi

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

async function renderPages(pages: Page[]): Promise<{ name: string; buffer: Buffer }[]> {
    const rendered: { name: string; buffer: Buffer }[] = [];
    
    for (const page of pages) {
        console.log(`Rendering page: ${page.order}-${page.name}`);
        
        const element = React.createElement(page.component);
        const buffer = await render(element, {
            width: A4_WIDTH,
            height: A4_HEIGHT,
            background: "#ffffff",
        });
        
        rendered.push({ name: `${page.order}-${page.name}`, buffer });
    }
    
    return rendered;
}

async function savePageImages(pages: { name: string; buffer: Buffer }[]): Promise<void> {
    const outputDir = join(__dirname, "../dist/pages");
    
    // Create output directory
    await mkdir(outputDir, { recursive: true });
    
    for (const page of pages) {
        const outputPath = join(outputDir, `${page.name}.webp`);
        await writeFile(outputPath, page.buffer);
        console.log(`Saved: ${outputPath}`);
    }
}

async function createPDF(pages: { name: string; buffer: Buffer }[]): Promise<void> {
    const pdfDoc = await PDFDocument.create();
    
    for (const page of pages) {
        console.log(`Adding ${page.name} to PDF`);
        
        // Convert WebP to PNG for PDF embedding
        const pngBuffer = await sharp(page.buffer).png().toBuffer();
        
        // Embed the PNG image
        const image = await pdfDoc.embedPng(pngBuffer);
        
        // Add a page with A4 dimensions (in points: 595x842)
        const pdfPage = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
        
        // Draw the image to fill the entire page
        pdfPage.drawImage(image, {
            x: 0,
            y: 0,
            width: A4_WIDTH,
            height: A4_HEIGHT,
        });
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
