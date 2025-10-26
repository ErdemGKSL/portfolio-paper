# ATS Optimization Guide

This document explains how to optimize your portfolio for Applicant Tracking Systems (ATS) and CV parsers.

## How It Works

The system automatically extracts text from your React components and embeds it as an invisible text layer in the generated PDF. This makes your visually-designed portfolio readable by ATS systems while maintaining your custom design.

## Basic Usage

### Method 1: Using `data-role` (Recommended)

Simply add a `data-role` attribute to any element you want CV parsers to read:

```tsx
<h1 data-role="name">John Doe</h1>
<p data-role="email">john.doe@email.com</p>
<div data-role="content">
  React • TypeScript • Node.js
</div>
```

### Method 2: Using `className="extract"`

Alternatively, you can use `className="extract"`:

```tsx
<h2 className="extract">Software Engineer</h2>
<p className="extract">john.doe@email.com</p>
```

**Note:** If you use `data-role`, you don't need to add `className="extract"` - the presence of `data-role` is enough to trigger extraction.

### Each Top-Level Extract is Treated Separately

Each element with `data-role` or `className="extract"` is treated as a separate section. This means:

```tsx
// ✅ Good - Three separate sections
<h2 data-role="section-heading">Experience</h2>
<div data-role="content">Senior Developer at Company X</div>
<div data-role="date">2020 - Present</div>

// ❌ Avoid - One combined section (children are not extracted separately)
<div data-role="content">
  <h2>Experience</h2>
  <div>Senior Developer at Company X</div>
  <div>2020 - Present</div>
</div>
```

## Semantic Roles for Better ATS Optimization

Using specific `data-role` values helps the system format your information in a way that ATS systems recognize best.

### Available Roles

#### Contact Information
```tsx
<p data-role="name">John Doe</p>
<p data-role="email">john.doe@example.com</p>
<p data-role="phone">+1 (555) 123-4567</p>
<a data-role="social">linkedin.com/in/johndoe</a>
<a data-role="url">https://johndoe.com</a>
```

#### Document Structure
```tsx
<h1 data-role="document-title">Portfolio</h1>
<h2 data-role="section-heading">Work Experience</h2>
```

#### Resume Sections
```tsx
<h2 data-role="experience-section">Work Experience</h2>
<h2 data-role="education-section">Education</h2>
<h2 data-role="skills-section">Technical Skills</h2>
```

#### Dates
```tsx
<p data-role="date">January 2020 - Present</p>
<p data-role="date">2015 - 2019</p>
```

#### Generic Content
```tsx
<p data-role="content">Any other text you want extracted</p>
```

### Auto-Detection

If you use `className="extract"` without specifying a `data-role`, the system will automatically detect the role based on:
- Element type (h1, h2, p, etc.)
- Font size
- Text content (looks for emails, phone numbers, dates, etc.)

## Output Format

The extracted text is formatted for maximum ATS compatibility:

```
PORTFOLIO

NAME: John Doe

EMAIL: john.doe@example.com
PHONE: +1 (555) 123-4567
LINK: linkedin.com/in/johndoe

=== WORK EXPERIENCE ===

SENIOR SOFTWARE ENGINEER

Company X
DATE: 2020 - Present

=== SKILLS ===

React, TypeScript, Node.js, Python
```

## How Text is Embedded in PDF

The extracted text is embedded as:
- **Invisible text layer** at the bottom of each page
- **Tiny (1pt) white text** on white background
- **Properly formatted** with ATS-recognized keywords (NAME:, EMAIL:, etc.)
- **Semantic structure** preserved with section markers

This makes it:
✅ Invisible to human readers
✅ Readable by ATS/CV parsing software
✅ Searchable in PDF readers
✅ Copy-pasteable (as plain text)

## Best Practices

### 1. Extract All Important Information
```tsx
// ✅ Good - All credentials are marked
<div>
  <h1 data-role="name">John Doe</h1>
  <p data-role="content">Senior Full-Stack Developer</p>
  <p data-role="email">john@example.com</p>
</div>
```

### 2. Keep Hierarchy Clear
```tsx
// ✅ Good - Clear hierarchy
<h2 data-role="section-heading">Experience</h2>
<h3 data-role="content">Senior Developer</h3>
<p data-role="content">Company Name</p>
<p data-role="date">2020 - Present</p>
```

### 3. Use Semantic HTML Elements
The system recognizes h1-h6 tags and gives them appropriate importance scores:
- `h1` → Highest importance (typically name or title)
- `h2` → Section headings
- `h3-h6` → Subsections
- `p` → Regular content

### 4. Extract Skills and Keywords
```tsx
<div data-role="content">
  React • TypeScript • Node.js • Express • MongoDB • PostgreSQL
</div>
```

ATS systems scan for specific keywords. Make sure all your important skills are marked for extraction.

## Debugging

The system generates `.txt` files alongside your `.webp` images in the `dist/pages/` directory. These files show exactly what text will be embedded in the PDF.

Check these files to ensure:
1. All important information is being extracted
2. The formatting looks correct
3. Keywords are properly included
4. Semantic markers (NAME:, EMAIL:, etc.) are applied correctly

## Example: Complete CV Page

```tsx
export default function CVPage() {
  return (
    <div style={{ padding: "80px", fontFamily: "Roboto" }}>
      {/* Header */}
      <h1 data-role="name" style={{ fontSize: "64px" }}>
        John Doe
      </h1>
      <p data-role="email">john.doe@example.com</p>
      <p data-role="phone">+1 (555) 123-4567</p>
      
      {/* Experience Section */}
      <h2 data-role="section-heading" style={{ marginTop: "40px" }}>
        Work Experience
      </h2>
      
      <h3 data-role="content" style={{ fontSize: "24px" }}>
        Senior Full-Stack Developer
      </h3>
      <p data-role="content">Tech Company Inc.</p>
      <p data-role="date">January 2020 - Present</p>
      <p data-role="content">
        Led development of microservices architecture using React, Node.js, and AWS.
        Improved system performance by 40% and reduced deployment time by 60%.
      </p>
      
      {/* Skills Section */}
      <h2 data-role="skills-section" style={{ marginTop: "40px" }}>
        Technical Skills
      </h2>
      <p data-role="content">
        JavaScript, TypeScript, React, Node.js, Express, Python, Django,
        PostgreSQL, MongoDB, AWS, Docker, Kubernetes, CI/CD
      </p>
      
      {/* Education */}
      <h2 data-role="education-section" style={{ marginTop: "40px" }}>
        Education
      </h2>
      <p data-role="content">Bachelor of Science in Computer Science</p>
      <p data-role="content">University Name</p>
      <p data-role="date">2015 - 2019</p>
    </div>
  );
}
```

This will generate ATS-optimized text while maintaining your visual design!
