# 📄 Portfolio Paper Generator

A Node.js-based tool for generating professional portfolio documents as high-quality PDFs from React components. Built with TypeScript, Satori, and React, this project renders custom-designed pages into A4-sized documents perfect for printing or digital distribution.A TypeScript-based portfolio generator that renders React components to PDF using Satori. Create your professional portfolio as beautiful, print-ready pages with custom fonts and styling.

## ✨ Features## ✨ Features

- 📄 **React-based page design** - Design your portfolio pages using familiar React/TSX syntax- 🎨 **React Components as Pages** - Write your portfolio pages using familiar React syntax

- 🎨 **Custom font support** - Automatically loads local fonts from the `fonts/` directory- 📑 **PDF Generation** - Automatically compiles all pages into a single PDF document

- 🖼️ **Image handling** - Seamlessly embed images with automatic path resolution- 🖼️ **WebP Export** - Saves each page as optimized WebP images

- 📑 **Multi-page PDF generation** - Combine multiple pages into a single PDF document- 🔤 **Custom Fonts** - Auto-loads fonts from your local `fonts/` directory

- 🎯 **A4 print-ready output** - High-resolution rendering (2480x3508px @ 300 DPI)- 📏 **A4 Format** - All pages are properly sized for A4 paper (595×842px)

- 💾 **WebP intermediate format** - Saves individual pages as WebP images- ⚡ **No Build Step** - Runs directly with `tsx` - no JavaScript compilation needed

- 🔄 **Auto-discovery system** - Automatically finds and orders pages based on filename- 🔄 **Auto-Discovery** - Automatically finds and orders pages by filename


## 🚀 Quick Start## 🚀 Quick Start

### Prerequisites### Installation

- Node.js (v18 or higher recommended)```bash

- pnpm (or npm/yarn)# Clone the repository

git clone https://github.com/ErdemGKSL/portfolio-paper.git

### Installationcd portfolio-paper



```bash# Install dependencies

# Clone the repositorypnpm install

git clone https://github.com/ErdemGKSL/portfolio-paper.git```

cd portfolio-paper

### Usage

# Install dependencies

pnpm install```bash

```# Generate your portfolio

pnpm build

### Usage```



```bashThis will:

# Generate your portfolio PDF1. Load fonts from the `fonts/` directory

pnpm build2. Discover all pages in `src/pages/`

```3. Render each page to WebP images in `dist/pages/`

4. Compile all pages into `dist/output.pdf`

The output will be generated in the `dist/` directory:

- `dist/pages/` - Individual WebP images for each page## 📁 Project Structure

- `dist/output.pdf` - Final combined PDF document

```

## 📁 Project Structureportfolio-paper/

├── src/

```│   ├── index.ts           # Main orchestration logic

portfolio-paper/│   ├── satori.ts          # Satori rendering engine

├── src/│   ├── load-fonts.ts      # Automatic font loader

│   ├── index.ts           # Main entry point and orchestration│   └── pages/             # Your portfolio pages

│   ├── satori.ts          # SVG/image rendering logic│       ├── 1-home.tsx     # Cover page

│   ├── load-fonts.ts      # Font loading and registration│       ├── 2-about.tsx    # About page

│   └── pages/             # Portfolio pages (auto-discovered)│       └── 3-projects.tsx # Projects page

│       └── 1-home.tsx     # Example home page├── fonts/                 # Custom fonts directory

├── fonts/                 # Custom font files│   ├── Roboto/

│   ├── Oswald/│   └── Oswald/

│   └── Roboto/├── dist/                  # Generated output

├── images/                # Static images referenced in pages│   ├── pages/            # Individual WebP images

├── dist/                  # Generated output (created on build)│   └── output.pdf        # Final PDF document

└── package.json└── package.json

``````



## 📝 Creating Pages## 📝 Creating Pages



Pages are automatically discovered from the `src/pages/` directory. Name your files with a number prefix to control the order:Pages are React components with numbered filenames that determine their order:



```tsx```tsx

// src/pages/1-home.tsx// src/pages/4-experience.tsx

import React from "react";import React from "react";



export default function Home() {export default function Experience() {

    return (    return (

        <div        <div

            style={{            style={{

                display: "flex",                display: "flex",

                flexDirection: "column",                flexDirection: "column",

                width: "100%",                width: "100%",

                height: "100%",                height: "100%",

                backgroundColor: "#ffffff",                backgroundColor: "#ffffff",

                padding: "80px",                padding: "80px",

                fontFamily: "Roboto",                fontFamily: "Roboto",

            }}            }}

        >        >

            <h1 style={{ fontSize: "576px", fontFamily: "Oswald" }}>            <h1 style={{ fontFamily: "Oswald", fontSize: "48px" }}>

                Portfolio                Experience

            </h1>            </h1>

            <p style={{ fontSize: "256px", color: "#666666" }}>            <p style={{ fontSize: "18px", lineHeight: "1.6" }}>

                Your Name                Your experience content here...

            </p>            </p>

        </div>        </div>

    );    );

}}

``````



### Page Naming Convention### Page Naming Convention



- `1-home.tsx` - Order: 1, Name: "home"Pages must follow the format: `{number}-{name}.tsx`

- `2-about.tsx` - Order: 2, Name: "about"

- `3-projects.tsx` - Order: 3, Name: "projects"- ✅ `1-home.tsx`

- ✅ `2-about.tsx`

The number prefix determines the page order in the final PDF.- ✅ `10-contact.tsx`

- ❌ `home.tsx` (missing number)

## 🎨 Adding Custom Fonts- ❌ `page-1.tsx` (number must be at start)



1. Place your font files in the `fonts/` directory:## 🔤 Using Custom Fonts

   ```

   fonts/### Adding Fonts

   └── YourFont/

       └── static/1. Create a folder in `fonts/` with your font family name:

           ├── YourFont-Regular.ttf   ```

           ├── YourFont-Bold.ttf   fonts/

           └── YourFont-Italic.ttf   └── YourFont/

   ```       └── static/

           ├── YourFont-Regular.ttf

2. The system automatically:           ├── YourFont-Bold.ttf

   - Scans the `fonts/` directory           └── YourFont-Italic.ttf

   - Loads all `.ttf` and `.otf` files   ```

   - Detects font weights and styles from filenames

   - Registers them for use in your pages2. The font loader automatically:

   - Discovers all `.ttf` and `.otf` files

3. Use the font in your components:   - Parses weights from filenames (Regular=400, Bold=700, etc.)

   ```tsx   - Detects italic styles

   <h1 style={{ fontFamily: "YourFont", fontWeight: 700 }}>   - Registers them with Satori

       Heading

   </h1>### Using Fonts in Pages

   ```

Simply reference the font family name in your styles:

### Supported Font Weights

```tsx

- Thin: 100<h1 style={{ fontFamily: "YourFont", fontWeight: "bold" }}>

- ExtraLight: 200    Hello World

- Light: 300</h1>

- Regular: 400```

- Medium: 500

- SemiBold: 600### Supported Weight Keywords

- Bold: 700

- ExtraBold: 800The auto-loader recognizes these weight keywords in filenames:

- Black: 900

- `Thin` → 100

## 🖼️ Using Images- `ExtraLight` → 200

- `Light` → 300

Place images in the `images/` directory and reference them with absolute paths:- `Regular` → 400

- `Medium` → 500

```tsx- `SemiBold` → 600

// In your page component- `Bold` → 700

<img src="/your-image.png" style={{ width: "500px" }} />- `ExtraBold` → 800

- `Black` → 900

// Or as background

<div## 🎨 Styling Guidelines

    style={{

        backgroundImage: "url('/background.jpg')",Since Satori has some limitations compared to browser CSS, follow these guidelines:

        backgroundSize: "cover",

    }}### ✅ Supported

>

    Content- Flexbox layouts (`display: flex`)

</div>- Basic text styling (color, fontSize, fontWeight)

```- Backgrounds (backgroundColor)

- Padding and margins

Supported formats: JPG, PNG, GIF, WebP, SVG- Border radius



## 🔧 Technical Details### ❌ Not Supported



### Rendering Pipeline- CSS Grid

- Advanced animations

1. **Discovery** - Scans `src/pages/` for numbered `.tsx` files- Box shadows (limited)

2. **Font Loading** - Loads and registers all fonts from `fonts/`- Some CSS properties

3. **Page Rendering** - Each page component is rendered to SVG using Satori

4. **Image Resolution** - Local images are converted to base64 data URLsRefer to [Satori's documentation](https://github.com/vercel/satori) for full CSS support details.

5. **Rasterization** - SVG is converted to PNG using Resvg

6. **Compression** - PNG is compressed to WebP format## 📐 Technical Details

7. **PDF Assembly** - WebP images are converted to JPEG and embedded in PDF

- **Page Dimensions**: 595×842 pixels (A4 at 72 DPI)

### Output Specifications- **Output Format**: WebP images + PDF

- **Image Rendering**: Satori → SVG → ResvgJS → PNG → Sharp → WebP

- **Resolution**: 2480x3508 pixels (300 DPI)- **PDF Assembly**: pdf-lib

- **Page Size**: A4 (210mm × 297mm)

- **Image Format**: WebP (high quality)## 🛠️ Development

- **PDF Format**: JPEG-embedded pages at 95% quality

### Project Scripts

## 🛠️ Technologies

```json

- **React** - Component-based page design{

- **TypeScript** - Type-safe development  "scripts": {

- **Satori** - HTML/CSS to SVG conversion    "build": "tsx src/index.ts"

- **Resvg** - SVG to PNG rasterization  }

- **Sharp** - Image processing and WebP conversion}

- **pdf-lib** - PDF document creation```



## 📦 Dependencies### Dependencies



```json- **satori** - Convert React components to SVG

{- **@resvg/resvg-js** - SVG to PNG rendering

  "react": "^19.2.0",- **sharp** - Image processing and WebP conversion

  "@resvg/resvg-js": "^2.6.2",- **pdf-lib** - PDF document creation

  "pdf-lib": "^1.17.1",- **tsx** - TypeScript execution

  "satori": "^0.18.3",- **react** - Component framework

  "sharp": "^0.34.4"

}## 📦 Output

```

After running `pnpm build`, you'll find:

## 🤝 Contributing

- `dist/pages/*.webp` - Individual page images

Contributions are welcome! Feel free to:- `dist/output.pdf` - Complete portfolio PDF (ready to print!)



1. Fork the repository## 🤝 Contributing

2. Create a feature branch (`git checkout -b feature/amazing-feature`)

3. Commit your changes (`git commit -m 'Add amazing feature'`)Contributions are welcome! Feel free to open issues or submit pull requests.

4. Push to the branch (`git push origin feature/amazing-feature`)

5. Open a Pull Request## 📄 License



## 📄 LicenseISC



This project is licensed under the ISC License.## 👤 Author



## 🙏 Acknowledgments**ErdemGKSL**



- [Satori](https://github.com/vercel/satori) - Amazing HTML/CSS to SVG renderer---

- [Resvg](https://github.com/yisibl/resvg-js) - High-quality SVG rendering

- [Sharp](https://sharp.pixelplumbing.com/) - Fast image processingMade with ❤️ using [Satori](https://github.com/vercel/satori)


## 💡 Tips

- Use inline styles only (Satori doesn't support external CSS)
- Flexbox is fully supported for layouts
- Test font rendering with different weights and styles
- Keep image sizes reasonable for faster processing
- Use WebP format for final page previews (smaller file size)

---

Made with ❤️ for creating beautiful portfolio documents
