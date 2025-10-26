import { Resvg } from "@resvg/resvg-js";
import type { JSX } from "react";
import satori, { SatoriOptions } from "satori";
import sharp from "sharp";
import { readFile } from "fs/promises";
import { join } from "path";
import React from "react";

async function resolveImagePath(src: string): Promise<string> {
    // If it's already an absolute URL or data URL, return as is
    if (src.startsWith("file://") || src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
        return src;
    }

    // Remove leading slash if present
    const cleanPath = src.startsWith("/") ? src.slice(1) : src;
    
    // Resolve to images directory
    const imagePath = join(process.cwd(), "images", cleanPath);
    
    try {
        // Read the image file
        const imageBuffer = await readFile(imagePath);
        
        // Determine MIME type based on extension
        const ext = cleanPath.split(".").pop()?.toLowerCase();
        const mimeTypes: Record<string, string> = {
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            png: "image/png",
            gif: "image/gif",
            webp: "image/webp",
            svg: "image/svg+xml",
        };
        
        const mimeType = mimeTypes[ext || ""] || "image/jpeg";
        
        // Convert to base64 data URL
        return `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
    } catch (error) {
        console.warn(`⚠️  Warning: Could not load image: ${imagePath}`);
        throw error;
    }
}

async function resolveImagesInElement(element: any): Promise<any> {
    if (!element) return element;
    
    // Handle arrays of elements
    if (Array.isArray(element)) {
        return await Promise.all(element.map(resolveImagesInElement));
    }
    
    // Handle React element objects
    if (typeof element === "object" && element.type && element.props) {
        let props: any = { ...element.props };
        let type = element.type;
        
        // If type is a function component, render it first
        if (typeof type === "function") {
            const rendered = type(props);
            return await resolveImagesInElement(rendered);
        }
        
        // Resolve img src attributes
        if (type === "img" && props.src && typeof props.src === "string" && props.src.startsWith("/")) {
            props.src = await resolveImagePath(props.src);
        }
        
        // Resolve background images in style
        if (props.style?.backgroundImage && typeof props.style.backgroundImage === "string") {
            const match = props.style.backgroundImage.match(/url\(['"]?([^'"()]+)['"]?\)/);
            if (match && match[1].startsWith("/")) {
                const resolvedUrl = await resolveImagePath(match[1]);
                props.style = {
                    ...props.style,
                    backgroundImage: `url('${resolvedUrl}')`,
                };
            }
        }
        
        // Recursively resolve children
        if (props.children) {
            props.children = await resolveImagesInElement(props.children);
        }
        
        return { ...element, type, props };
    }
    
    return element;
}

export interface ToImageOptions {
    fonts: SatoriOptions["fonts"];
    width: number;
    height: number;
    background?: `#${string}`;
}

export async function toImage(elm: JSX.Element, opt: ToImageOptions): Promise<Buffer> {
    const svg = await satori(elm, {
        width: opt.width,
        height: opt.height,
        fonts: opt.fonts,
    });

    const resvg = new Resvg(svg, {
        fitTo: {
            mode: "width",
            value: opt.width,
        },
        background: opt.background,
        
    });

    return await sharp(resvg.render().asPng()).webp().toBuffer();
}

let cachedFonts: ToImageOptions["fonts"] = [];

export function registerFonts(...fonts: ToImageOptions["fonts"]) {
    cachedFonts.push(...fonts);
}

export type RenderOptions = Omit<ToImageOptions, "fonts"> & { fonts?: string[] };

export async function render(elm: JSX.Element, opt: RenderOptions): Promise<Buffer> {
    // Resolve all image paths before rendering
    const resolvedElement = await resolveImagesInElement(elm);
    
    const fonts = opt.fonts 
        ? cachedFonts.filter((f) => opt.fonts?.includes(f.name))
        : cachedFonts;
    return await toImage(resolvedElement, {
        ...opt,
        fonts,
    });
}