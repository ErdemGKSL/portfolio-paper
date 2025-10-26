# Portfolio Paper Generator

A Node.js-based tool for generating professional portfolio documents as high-quality PDFs from React components. Built with TypeScript, Satori, and React, this project renders custom-designed pages into A4-sized documents perfect for printing or digital distribution.

## ✨ Features

- 📄 **React-based page design** - Design your portfolio pages using familiar React/TSX syntax
- 🎨 **Custom font support** - Automatically loads local fonts from the `fonts/` directory
- 🖼️ **Image handling** - Seamlessly embed images with automatic path resolution
- 📑 **Multi-page PDF generation** - Combine multiple pages into a single PDF document
- 🎯 **A4 print-ready output** - High-resolution rendering (2480x3508px @ 300 DPI)
- 💾 **WebP intermediate format** - Saves individual pages as WebP images
- 🔄 **Auto-discovery system** - Automatically finds and orders pages based on filename

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (or npm/yarn)

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
# Generate your portfolio PDF
pnpm build
```

The output will be generated in the `dist/` directory:
- `dist/pages/` - Individual WebP images for each page
- `dist/output.pdf` - Final combined PDF document

## 📁 Project Structure

```
portfolio-paper/
├── src/
│   ├── index.ts           # Main entry point and orchestration
│   ├── satori.ts          # SVG/image rendering logic
│   ├── load-fonts.ts      # Font loading and registration
│   └── pages/             # Portfolio pages (auto-discovered)
│       └── 1-home.tsx     # Example home page
├── fonts/                 # Custom font files
│   ├── Oswald/
│   └── Roboto/
├── images/                # Static images referenced in pages
├── dist/                  # Generated output (created on build)
└── package.json
```

## 📝 Creating Pages

Pages are automatically discovered from the `src/pages/` directory. Name your files with a number prefix to control the order:

```tsx
// src/pages/1-home.tsx
import React from "react";

export default function Home() {
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
            <h1 style={{ fontSize: "576px", fontFamily: "Oswald" }}>
                Portfolio
            </h1>
            <p style={{ fontSize: "256px", color: "#666666" }}>
                Your Name
            </p>
        </div>
    );
}
```

### Page Naming Convention

- `1-home.tsx` - Order: 1, Name: "home"
- `2-about.tsx` - Order: 2, Name: "about"
- `3-projects.tsx` - Order: 3, Name: "projects"

The number prefix determines the page order in the final PDF.

## 🎨 Adding Custom Fonts

1. Place your font files in the `fonts/` directory:
   ```
   fonts/
   └── YourFont/
       └── static/
           ├── YourFont-Regular.ttf
           ├── YourFont-Bold.ttf
           └── YourFont-Italic.ttf
   ```

2. The system automatically:
   - Scans the `fonts/` directory
   - Loads all `.ttf` and `.otf` files
   - Detects font weights and styles from filenames
   - Registers them for use in your pages

3. Use the font in your components:
   ```tsx
   <h1 style={{ fontFamily: "YourFont", fontWeight: 700 }}>
       Heading
   </h1>
   ```

### Supported Font Weights

- Thin: 100
- ExtraLight: 200
- Light: 300
- Regular: 400
- Medium: 500
- SemiBold: 600
- Bold: 700
- ExtraBold: 800
- Black: 900

## 🖼️ Using Images

Place images in the `images/` directory and reference them with absolute paths:

```tsx
// In your page component
<img src="/your-image.png" style={{ width: "500px" }} />

// Or as background
<div
    style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
    }}
>
    Content
</div>
```

Supported formats: JPG, PNG, GIF, WebP, SVG

## 🔧 Technical Details

### Rendering Pipeline

1. **Discovery** - Scans `src/pages/` for numbered `.tsx` files
2. **Font Loading** - Loads and registers all fonts from `fonts/`
3. **Page Rendering** - Each page component is rendered to SVG using Satori
4. **Image Resolution** - Local images are converted to base64 data URLs
5. **Rasterization** - SVG is converted to PNG using Resvg
6. **Compression** - PNG is compressed to WebP format
7. **PDF Assembly** - WebP images are converted to JPEG and embedded in PDF

### Output Specifications

- **Resolution**: 2480x3508 pixels (300 DPI)
- **Page Size**: A4 (210mm × 297mm)
- **Image Format**: WebP (high quality)
- **PDF Format**: JPEG-embedded pages at 95% quality

## 🛠️ Technologies

- **React** - Component-based page design
- **TypeScript** - Type-safe development
- **Satori** - HTML/CSS to SVG conversion
- **Resvg** - SVG to PNG rasterization
- **Sharp** - Image processing and WebP conversion
- **pdf-lib** - PDF document creation

## 📦 Dependencies

```json
{
  "react": "^19.2.0",
  "@resvg/resvg-js": "^2.6.2",
  "pdf-lib": "^1.17.1",
  "satori": "^0.18.3",
  "sharp": "^0.34.4"
}
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [Satori](https://github.com/vercel/satori) - Amazing HTML/CSS to SVG renderer
- [Resvg](https://github.com/yisibl/resvg-js) - High-quality SVG rendering
- [Sharp](https://sharp.pixelplumbing.com/) - Fast image processing

## 💡 Tips

- Use inline styles only (Satori doesn't support external CSS)
- Flexbox is fully supported for layouts
- Test font rendering with different weights and styles
- Keep image sizes reasonable for faster processing
- Use WebP format for final page previews (smaller file size)

---

Made with ❤️ for creating beautiful portfolio documents
