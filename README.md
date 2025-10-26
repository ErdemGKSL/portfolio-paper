# 📄 Portfolio Paper

A TypeScript-based portfolio generator that renders React components to PDF using Satori. Create your professional portfolio as beautiful, print-ready pages with custom fonts and styling.

## ✨ Features

- 🎨 **React Components as Pages** - Write your portfolio pages using familiar React syntax
- 📑 **PDF Generation** - Automatically compiles all pages into a single PDF document
- 🖼️ **WebP Export** - Saves each page as optimized WebP images
- 🔤 **Custom Fonts** - Auto-loads fonts from your local `fonts/` directory
- 📏 **A4 Format** - All pages are properly sized for A4 paper (595×842px)
- ⚡ **No Build Step** - Runs directly with `tsx` - no JavaScript compilation needed
- 🔄 **Auto-Discovery** - Automatically finds and orders pages by filename

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/ErdemGKSL/portfolio-paper.git
cd portfolio-paper

# Install dependencies
pnpm install
```

### Usage

```bash
# Generate your portfolio
pnpm build
```

This will:
1. Load fonts from the `fonts/` directory
2. Discover all pages in `src/pages/`
3. Render each page to WebP images in `dist/pages/`
4. Compile all pages into `dist/output.pdf`

## 📁 Project Structure

```
portfolio-paper/
├── src/
│   ├── index.ts           # Main orchestration logic
│   ├── satori.ts          # Satori rendering engine
│   ├── load-fonts.ts      # Automatic font loader
│   └── pages/             # Your portfolio pages
│       ├── 1-home.tsx     # Cover page
│       ├── 2-about.tsx    # About page
│       └── 3-projects.tsx # Projects page
├── fonts/                 # Custom fonts directory
│   ├── Roboto/
│   └── Oswald/
├── dist/                  # Generated output
│   ├── pages/            # Individual WebP images
│   └── output.pdf        # Final PDF document
└── package.json
```

## 📝 Creating Pages

Pages are React components with numbered filenames that determine their order:

```tsx
// src/pages/4-experience.tsx
import React from "react";

export default function Experience() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                backgroundColor: "#ffffff",
                padding: "80px",
                fontFamily: "Roboto",
            }}
        >
            <h1 style={{ fontFamily: "Oswald", fontSize: "48px" }}>
                Experience
            </h1>
            <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
                Your experience content here...
            </p>
        </div>
    );
}
```

### Page Naming Convention

Pages must follow the format: `{number}-{name}.tsx`

- ✅ `1-home.tsx`
- ✅ `2-about.tsx`
- ✅ `10-contact.tsx`
- ❌ `home.tsx` (missing number)
- ❌ `page-1.tsx` (number must be at start)

## 🔤 Using Custom Fonts

### Adding Fonts

1. Create a folder in `fonts/` with your font family name:
   ```
   fonts/
   └── YourFont/
       └── static/
           ├── YourFont-Regular.ttf
           ├── YourFont-Bold.ttf
           └── YourFont-Italic.ttf
   ```

2. The font loader automatically:
   - Discovers all `.ttf` and `.otf` files
   - Parses weights from filenames (Regular=400, Bold=700, etc.)
   - Detects italic styles
   - Registers them with Satori

### Using Fonts in Pages

Simply reference the font family name in your styles:

```tsx
<h1 style={{ fontFamily: "YourFont", fontWeight: "bold" }}>
    Hello World
</h1>
```

### Supported Weight Keywords

The auto-loader recognizes these weight keywords in filenames:

- `Thin` → 100
- `ExtraLight` → 200
- `Light` → 300
- `Regular` → 400
- `Medium` → 500
- `SemiBold` → 600
- `Bold` → 700
- `ExtraBold` → 800
- `Black` → 900

## 🎨 Styling Guidelines

Since Satori has some limitations compared to browser CSS, follow these guidelines:

### ✅ Supported

- Flexbox layouts (`display: flex`)
- Basic text styling (color, fontSize, fontWeight)
- Backgrounds (backgroundColor)
- Padding and margins
- Border radius

### ❌ Not Supported

- CSS Grid
- Advanced animations
- Box shadows (limited)
- Some CSS properties

Refer to [Satori's documentation](https://github.com/vercel/satori) for full CSS support details.

## 📐 Technical Details

- **Page Dimensions**: 595×842 pixels (A4 at 72 DPI)
- **Output Format**: WebP images + PDF
- **Image Rendering**: Satori → SVG → ResvgJS → PNG → Sharp → WebP
- **PDF Assembly**: pdf-lib

## 🛠️ Development

### Project Scripts

```json
{
  "scripts": {
    "build": "tsx src/index.ts"
  }
}
```

### Dependencies

- **satori** - Convert React components to SVG
- **@resvg/resvg-js** - SVG to PNG rendering
- **sharp** - Image processing and WebP conversion
- **pdf-lib** - PDF document creation
- **tsx** - TypeScript execution
- **react** - Component framework

## 📦 Output

After running `pnpm build`, you'll find:

- `dist/pages/*.webp` - Individual page images
- `dist/output.pdf` - Complete portfolio PDF (ready to print!)

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

ISC

## 👤 Author

**ErdemGKSL**

---

Made with ❤️ using [Satori](https://github.com/vercel/satori)
