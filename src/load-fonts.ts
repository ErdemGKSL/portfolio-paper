import { readdir, readFile } from "fs/promises";
import { join } from "path";
import type { SatoriOptions } from "satori";
import { registerFonts } from "./satori";

type FontInfo = SatoriOptions["fonts"][number];
type Weight = FontInfo["weight"];

const WEIGHT_MAP: Record<string, Weight> = {
    Thin: 100,
    ExtraLight: 200,
    Light: 300,
    Regular: 400,
    Medium: 500,
    SemiBold: 600,
    Bold: 700,
    ExtraBold: 800,
    Black: 900,
};

function parseFontInfo(filename: string, familyName: string): { weight: Weight; style: "normal" | "italic" } {
    const isItalic = filename.includes("Italic");
    
    // Try to extract weight from filename
    let weight: Weight = 400; // default
    
    for (const [weightName, weightValue] of Object.entries(WEIGHT_MAP)) {
        if (filename.includes(weightName)) {
            weight = weightValue;
            break;
        }
    }
    
    return {
        weight,
        style: isItalic ? "italic" : "normal",
    };
}

async function loadFontsFromDirectory(dir: string, familyName: string): Promise<FontInfo[]> {
    const fonts: FontInfo[] = [];
    
    try {
        const files = await readdir(dir);
        
        for (const file of files) {
            if (!file.endsWith(".ttf") && !file.endsWith(".otf")) continue;
            
            // Skip variable fonts for now
            if (file.includes("VariableFont")) continue;
            
            const filePath = join(dir, file);
            const data = await readFile(filePath);
            const { weight, style } = parseFontInfo(file, familyName);
            
            fonts.push({
                name: familyName,
                weight,
                style,
                data: data.buffer,
            });
        }
    } catch (error) {
        // Directory doesn't exist or can't be read, skip it
    }
    
    return fonts;
}

export async function autoLoadFonts(): Promise<void> {
    const fontsDir = join(__dirname, "../fonts");
    const allFonts: FontInfo[] = [];
    
    try {
        const families = await readdir(fontsDir);
        
        for (const family of families) {
            const familyPath = join(fontsDir, family);
            
            // Try to load from static subdirectory first (preferred for most fonts)
            const staticPath = join(familyPath, "static");
            let fonts = await loadFontsFromDirectory(staticPath, family);
            
            // If no static fonts found, try loading from family root
            if (fonts.length === 0) {
                fonts = await loadFontsFromDirectory(familyPath, family);
            }
            
            allFonts.push(...fonts);
        }
        
        if (allFonts.length > 0) {
            console.log(`📝 Loaded ${allFonts.length} font(s) from ${new Set(allFonts.map(f => f.name)).size} families`);
            registerFonts(...allFonts);
        } else {
            console.log("⚠️  No fonts found in fonts directory, using fallback");
            // Fallback to CDN fonts if no local fonts found
            await loadFallbackFonts();
        }
    } catch (error) {
        console.log("⚠️  Fonts directory not found, using fallback");
        await loadFallbackFonts();
    }
}

async function loadFallbackFonts(): Promise<void> {
    registerFonts(
        {
            name: "Inter",
            data: await fetch("https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf").then(res => res.arrayBuffer()),
            weight: 400,
            style: "normal",
        },
        {
            name: "Inter",
            data: await fetch("https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf").then(res => res.arrayBuffer()),
            weight: 700,
            style: "normal",
        }
    );
}
