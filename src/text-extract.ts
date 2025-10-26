import React, { type JSX } from "react";

export interface ExtractedSection {
    text: string;
    type: string; // h1, h2, h3, p, div, etc.
    x: number;
    y: number;
    fontSize: number;
    fontWeight: string;
    isTopLevel: boolean; // Whether this is a top-level extract element
    metadata?: {
        role?: string; // For semantic roles like "name", "title", "contact", etc.
        importance?: number; // 1-10, based on font size and weight
    };
}

/**
 * Recursively extracts text content from React elements with data-role attribute or className="extract"
 * Each top-level extract element is treated as a separate section for ATS optimization
 */
export function extractTextFromElement(
    element: any,
    parentX = 0,
    parentY = 0,
    parentWidth = 0,
    parentHeight = 0,
    isTopLevel = true,
    insideExtract = false
): ExtractedSection[] {
    const extracted: ExtractedSection[] = [];

    if (!element) return extracted;

    // Handle arrays of elements
    if (Array.isArray(element)) {
        for (const child of element) {
            extracted.push(...extractTextFromElement(child, parentX, parentY, parentWidth, parentHeight, isTopLevel, insideExtract));
        }
        return extracted;
    }

    // Handle React element objects
    if (typeof element === "object" && element.type && element.props) {
        const props = element.props;
        const type = element.type;
        
        // If the type is a function component, we need to render it first
        if (typeof type === "function") {
            const rendered = type(props);
            return extractTextFromElement(rendered, parentX, parentY, parentWidth, parentHeight, isTopLevel, insideExtract);
        }
        
        const style = props.style || {};
        
        // Calculate element position (simplified - assumes flex/block layout)
        let x = parentX;
        let y = parentY;
        
        // Check if this element should be extracted
        // Extract if data-role exists OR className includes "extract"
        const hasDataRole = !!props["data-role"];
        const hasExtractClass = props.className?.includes("extract");
        const shouldExtract = hasDataRole || hasExtractClass;
        
        // Get text content if this element should be extracted
        if (shouldExtract && !insideExtract) {
            const text = getTextContent(element);
            if (text.trim()) {
                // Extract font size from style
                const fontSize = typeof style.fontSize === "string" 
                    ? parseFloat(style.fontSize) 
                    : (typeof style.fontSize === "number" ? style.fontSize : 16);
                
                const fontWeight = style.fontWeight?.toString() || "normal";
                const elementType = typeof type === "string" ? type : "div";
                
                // Calculate importance based on font size and weight
                const importance = calculateImportance(fontSize, fontWeight, elementType);
                
                // Try to determine semantic role from data attributes or context
                const role = props["data-role"] || inferRoleFromContext(elementType, text, fontSize);
                
                extracted.push({
                    text: text.trim(),
                    type: elementType,
                    x,
                    y,
                    fontSize,
                    fontWeight,
                    isTopLevel: isTopLevel,
                    metadata: {
                        role,
                        importance,
                    },
                });
            }
            
            // Don't recurse into children of extract elements
            // Each extract element is treated as a separate section
            return extracted;
        }
        
        // Recursively process children only if we're not inside an extract element
        if (props.children && !shouldExtract) {
            const childWidth = style.width || parentWidth;
            const childHeight = style.height || parentHeight;
            extracted.push(
                ...extractTextFromElement(props.children, x, y, childWidth, childHeight, false, insideExtract || shouldExtract)
            );
        }
    }

    return extracted;
}

/**
 * Recursively gets all text content from a React element
 */
function getTextContent(element: any): string {
    if (!element) return "";
    
    // Handle string and number primitives
    if (typeof element === "string" || typeof element === "number") {
        return element.toString();
    }
    
    // Handle arrays
    if (Array.isArray(element)) {
        return element.map(getTextContent).join(" ");
    }
    
    // Handle React elements
    if (typeof element === "object" && element.props) {
        if (element.props.children) {
            return getTextContent(element.props.children);
        }
    }
    
    return "";
}

/**
 * Calculate importance score (1-10) based on font size, weight, and element type
 */
function calculateImportance(fontSize: number, fontWeight: string, elementType: string): number {
    let score = 5; // Base score
    
    // Adjust for element type
    const typeScores: Record<string, number> = {
        h1: 3,
        h2: 2,
        h3: 1,
        h4: 0.5,
        h5: 0,
        h6: 0,
        p: 0,
        div: 0,
        span: -1,
    };
    score += typeScores[elementType] || 0;
    
    // Adjust for font size (normalized to typical web sizes)
    if (fontSize >= 32) score += 3;
    else if (fontSize >= 24) score += 2;
    else if (fontSize >= 18) score += 1;
    else if (fontSize < 12) score -= 1;
    
    // Adjust for font weight
    const weight = fontWeight.toLowerCase();
    if (weight.includes("bold") || parseInt(fontWeight) >= 700) score += 2;
    else if (weight.includes("semibold") || parseInt(fontWeight) >= 600) score += 1;
    else if (weight.includes("light") || parseInt(fontWeight) <= 300) score -= 1;
    
    return Math.max(1, Math.min(10, Math.round(score)));
}

/**
 * Infer semantic role from context
 */
function inferRoleFromContext(elementType: string, text: string, fontSize: number): string {
    const lowerText = text.toLowerCase();
    
    // Common patterns for CV/resume sections
    if (elementType === "h1" || fontSize > 40) {
        if (lowerText.includes("portfolio") || lowerText.includes("resume") || lowerText.includes("cv")) {
            return "document-title";
        }
        return "name";
    }
    
    if (elementType === "h2" || fontSize > 24) {
        return "section-heading";
    }
    
    // Contact information patterns
    if (lowerText.includes("@") || lowerText.includes("email")) return "email";
    if (lowerText.match(/\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/)) return "phone";
    if (lowerText.includes("linkedin") || lowerText.includes("github")) return "social";
    if (lowerText.match(/https?:\/\//)) return "url";
    
    // Experience/Education patterns
    if (lowerText.includes("experience") || lowerText.includes("work history")) return "experience-section";
    if (lowerText.includes("education") || lowerText.includes("degree")) return "education-section";
    if (lowerText.includes("skills") || lowerText.includes("technologies")) return "skills-section";
    
    // Date patterns
    if (lowerText.match(/\b(19|20)\d{2}\b/) || lowerText.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i)) {
        return "date";
    }
    
    return "content";
}

/**
 * Formats extracted text as ATS-optimized plain text for embedding in PDF
 * Each top-level extract element is treated as a separate section
 */
export function formatExtractedText(extracted: ExtractedSection[]): string {
    // Sort by importance (high to low), then by vertical position (top to bottom)
    const sorted = [...extracted].sort((a, b) => {
        // First, sort by vertical position to maintain reading order
        if (Math.abs(a.y - b.y) > 50) {
            return a.y - b.y;
        }
        // If on same line, sort by horizontal position
        return a.x - b.x;
    });
    
    const lines: string[] = [];
    
    for (const section of sorted) {
        const role = section.metadata?.role || "content";
        const importance = section.metadata?.importance || 5;
        
        // Format differently based on role and importance for ATS optimization
        let formattedText = section.text;
        
        // Add semantic markers that ATS systems recognize
        switch (role) {
            case "name":
                // Name should be prominent - ATS systems look for this
                formattedText = `NAME: ${section.text}`;
                lines.push(formattedText);
                lines.push(""); // Empty line for separation
                break;
                
            case "document-title":
                formattedText = section.text.toUpperCase();
                lines.push(formattedText);
                lines.push(""); // Empty line for separation
                break;
                
            case "section-heading":
                // Section headings should be clear
                formattedText = `\n--- ${section.text.toUpperCase()} ---`;
                lines.push(formattedText);
                break;
                
            case "email":
                formattedText = `EMAIL: ${section.text}`;
                lines.push(formattedText);
                break;
                
            case "phone":
                formattedText = `PHONE: ${section.text}`;
                lines.push(formattedText);
                break;
                
            case "url":
            case "social":
                formattedText = `LINK: ${section.text}`;
                lines.push(formattedText);
                break;
                
            case "date":
                formattedText = `DATE: ${section.text}`;
                lines.push(formattedText);
                break;
                
            case "experience-section":
            case "education-section":
            case "skills-section":
                formattedText = `\n=== ${section.text.toUpperCase()} ===`;
                lines.push(formattedText);
                lines.push(""); // Empty line for separation
                break;
                
            default:
                // Regular content
                if (importance >= 7) {
                    // High importance - make it stand out
                    formattedText = section.text.toUpperCase();
                }
                lines.push(formattedText);
                
                // Add spacing after top-level sections
                if (section.isTopLevel) {
                    lines.push(""); // Empty line for separation
                }
        }
    }
    
    return lines.join("\n").trim();
}

/**
 * Simple text content extraction for a React element
 * Returns all text marked with data-role or className="extract" as ATS-optimized formatted string
 */
export function extractAllText(element: JSX.Element): string {
    const extracted = extractTextFromElement(element);
    return formatExtractedText(extracted);
}
