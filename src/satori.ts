import { Resvg } from "@resvg/resvg-js";
import type { JSX } from "react";
import satori, { SatoriOptions } from "satori";
import sharp from "sharp";

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
    const fonts = opt.fonts 
        ? cachedFonts.filter((f) => opt.fonts?.includes(f.name))
        : cachedFonts;
    return await toImage(elm, {
        ...opt,
        fonts,
    });
}