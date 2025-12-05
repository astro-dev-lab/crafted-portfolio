# 🎨 COLOR-STYLE-ACCENT-UI-UX GUIDE
## Swiss Precision Color & Visual Design System

> *"Color is not decoration—it's communication. Every hue carries meaning, every shade serves purpose."*

---

## Table of Contents

1. [Color Philosophy](#1-color-philosophy)
2. [The Swiss Palette](#2-the-swiss-palette)
3. [Color Mathematics](#3-color-mathematics)
4. [Shadows & Depth](#4-shadows--depth)
5. [Gradients](#5-gradients)
6. [UI States](#6-ui-states)
7. [Accessibility](#7-accessibility)
8. [UX Patterns](#8-ux-patterns)

---

## 1. Color Philosophy

### 1.1 Swiss Color Principles

```
┌─────────────────────────────────────────────────────────────┐
│                    COLOR PHILOSOPHY                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PRINCIPLE 1: RESTRAINT                                     │
│  ─────────────────────                                      │
│  Use the minimum colors necessary.                          │
│  More color = more noise = less clarity.                    │
│  Our palette: Black, White, Gray, Blue. That's it.          │
│                                                              │
│  PRINCIPLE 2: PURPOSE                                       │
│  ─────────────────────                                      │
│  Every color has a job:                                     │
│  • Black/Gray: Structure, text, grounding                   │
│  • White: Space, breathing room, canvas                     │
│  • Blue: Action, emphasis, brand identity                   │
│                                                              │
│  PRINCIPLE 3: CONTRAST                                      │
│  ─────────────────────                                      │
│  High contrast for hierarchy.                               │
│  Low contrast for subtlety.                                 │
│  Never muddy middle ground.                                 │
│                                                              │
│  PRINCIPLE 4: CONSISTENCY                                   │
│  ─────────────────────                                      │
│  Same color = same meaning everywhere.                      │
│  Blue always means "interactive/accent."                    │
│  Red only for errors/destructive.                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 The Crafted Color Story

```
THE CRAFTED PALETTE NARRATIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FOUNDATION: Grayscale
  The bedrock of Swiss design. All information hierarchy
  is achievable in grayscale alone. Color is additive.

ACCENT: Precision Blue (#2563eb)
  Inspired by engineering blueprints and technical precision.
  The blue of CAD software, schematics, and intentional design.
  
SEMANTIC: Red for Errors
  Reserved exclusively for errors and destructive actions.
  Never decorative. Always meaningful.

SEMANTIC: Green for Success
  Reserved for success states and positive confirmation.
  Minimal use—success is the expected state.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 2. The Swiss Palette

### 2.1 CSS Custom Properties

```css
/* Source: src/app/globals.css @theme inline */

:root {
  /* Core */
  --color-swiss-black: #000000;
  --color-swiss-white: #ffffff;
  
  /* Neutral Scale (Gray) */
  --color-swiss-neutral-900: #111827;  /* Darkest - headings */
  --color-swiss-neutral-700: #374151;  /* Dark - secondary text */
  --color-swiss-neutral-500: #6b7280;  /* Mid - muted text */
  --color-swiss-neutral-300: #d1d5db;  /* Light - borders */
  --color-swiss-neutral-100: #f3f4f6;  /* Lightest - backgrounds */
  
  /* Accent (Blue) */
  --color-swiss-accent: #2563eb;       /* Primary blue */
  --color-swiss-accent-dark: #1d4ed8;  /* Hover/active state */
  --color-swiss-accent-light: #3b82f6; /* Light accent */
}
```

### 2.2 Complete Color Inventory

```
GRAYSCALE SPECTRUM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tailwind    │ Hex       │ Usage
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
gray-950    │ #030712   │ Hero background, darkest
gray-900    │ #111827   │ Primary text, buttons
gray-800    │ #1f2937   │ Secondary dark
gray-700    │ #374151   │ Secondary text
gray-600    │ #4b5563   │ Body text
gray-500    │ #6b7280   │ Muted text, placeholders
gray-400    │ #9ca3af   │ Disabled text
gray-300    │ #d1d5db   │ Borders, dividers
gray-200    │ #e5e7eb   │ Light borders
gray-100    │ #f3f4f6   │ Subtle backgrounds
gray-50     │ #f9fafb   │ Section backgrounds


BLUE SPECTRUM (Accent)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tailwind    │ Hex       │ Usage
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
blue-800    │ #1e40af   │ Darkest accent (rare)
blue-700    │ #1d4ed8   │ Button hover, gradient end
blue-600    │ #2563eb   │ PRIMARY ACCENT - CTAs, links
blue-500    │ #3b82f6   │ Light accent text
blue-400    │ #60a5fa   │ Light accent (dark bg)
blue-100    │ #dbeafe   │ Light blue background
blue-50     │ #eff6ff   │ Subtle blue background


SEMANTIC COLORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Color       │ Hex       │ Usage
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
red-600     │ #dc2626   │ Error text, destructive bg
red-500     │ #ef4444   │ Error badges
green-500   │ #22c55e   │ Success badges
```

### 2.3 Color Usage Matrix

| Context | Light Mode | Dark Mode (ContactCTA) |
|---------|------------|------------------------|
| Background | `white`, `gray-50` | `gray-950`, `gray-900` |
| Primary text | `gray-900` | `white` |
| Secondary text | `gray-700`, `gray-600` | `gray-300` |
| Muted text | `gray-500` | `gray-400` |
| Accent | `blue-600` | `blue-400`, `blue-500` |
| Borders | `gray-200`, `gray-300` | `gray-700` |

---

## 3. Color Mathematics

### 3.1 HSL Systematic Approach

```
HSL-BASED COLOR GENERATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The blue accent is defined in HSL for mathematical control:

Base Blue: hsl(214, 84%, 56%)
            │    │    └── Lightness: 56%
            │    └────── Saturation: 84%
            └───────── Hue: 214°

Variations by Lightness only:
  swiss-accent-dark:  hsl(214, 84%, 46%)  → L - 10%
  swiss-accent:       hsl(214, 84%, 56%)  → Base
  swiss-accent-light: hsl(214, 84%, 66%)  → L + 10%

Formula: L_variant = L_base ± 10%

This maintains hue consistency across all blue shades.
```

### 3.2 Gray Scale Derivation

```
GRAY SCALE FORMULA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tailwind grays follow a non-linear lightness curve:

Step   │ Name     │ L (Lightness)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
950    │ Darkest  │ 3%
900    │          │ 9%
800    │          │ 15%
700    │          │ 26%
600    │          │ 36%
500    │          │ 45%
400    │          │ 60%
300    │          │ 79%
200    │          │ 88%
100    │          │ 94%
50     │ Lightest │ 97%

The curve accelerates in the light end for subtle distinctions.
```

### 3.3 Opacity Mathematics

```
RGBA OPACITY SCALE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Standard opacity levels:

0.03  │ Minimal    │ Deepest shadow layer
0.04  │ Subtle     │ Third shadow layer
0.05  │ Light      │ Secondary shadow layer
0.08  │ Visible    │ Primary shadow layer
0.10  │ Clear      │ Text shadows
0.12  │ Standard   │ Card shadows
0.15  │ Strong     │ Blue accent shadows
0.25  │ Emphasis   │ CTA shadows
0.30  │ Bold       │ Glow effects

Formula: Each step ≈ previous × 1.25 (rough)
```

---

## 4. Shadows & Depth

### 4.1 Shadow System Architecture

```
SHADOW LAYER SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Our shadows use 3 layers for realistic depth:

Layer 1 (Close):  Small offset, tight blur
Layer 2 (Medium): Medium offset, medium blur
Layer 3 (Far):    Large offset, wide blur

Formula per layer:
  y-offset = depth × 4px
  blur     = depth × 8px
  opacity  = 0.15 / depth
```

### 4.2 Text Shadow Presets

```css
/* Dark text on light background */
.text-shadow-standard {
  text-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.10),
    0 4px 12px rgba(0, 0, 0, 0.05),
    0 8px 24px rgba(0, 0, 0, 0.03);
}

/* Blue accent text */
.text-shadow-blue {
  text-shadow: 
    0 2px 4px rgba(59, 130, 246, 0.15),
    0 8px 16px rgba(59, 130, 246, 0.08),
    0 16px 32px rgba(59, 130, 246, 0.04);
}

/* Subtle signature */
.text-shadow-subtle {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}
```

### 4.3 Box Shadow Presets

```css
/* Standard card shadow */
.shadow-card {
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 32px 64px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

/* Image container shadow */
.shadow-image {
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.10),
    0 16px 32px rgba(0, 0, 0, 0.08),
    0 32px 64px rgba(0, 0, 0, 0.04);
}

/* Blue accent element shadow */
.shadow-accent-line {
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

/* Blue icon background shadow */
.shadow-icon {
  box-shadow: 
    0 4px 12px rgba(59, 130, 246, 0.15),
    0 16px 32px rgba(59, 130, 246, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Blue CTA button shadow */
.shadow-cta {
  box-shadow: 
    0 4px 12px rgba(59, 130, 246, 0.30),
    0 8px 24px rgba(59, 130, 246, 0.15);
}

/* Glowing border (vertical accent) */
.shadow-glow {
  box-shadow: 
    0 0 20px rgba(59, 130, 246, 0.30),
    inset 0 0 20px rgba(59, 130, 246, 0.10);
}
```

### 4.4 Shadow Depth Scale

| Depth Level | Use Case | Shadow Style |
|-------------|----------|--------------|
| 0 | Flat | None |
| 1 | Subtle | `shadow-sm` |
| 2 | Raised | `shadow-card` (custom) |
| 3 | Elevated | `shadow-image` (custom) |
| 4 | Floating | Hover states |
| 5 | Modal | Overlays, modals |

---

## 5. Gradients

### 5.1 Standard Gradients

```css
/* Button gradient (primary CTA) */
.gradient-cta {
  background: linear-gradient(to right, #2563eb, #1d4ed8);
}
.gradient-cta:hover {
  background: linear-gradient(to right, #1d4ed8, #1e40af);
}

/* Hero overlay */
.gradient-hero-overlay {
  background: linear-gradient(
    to right,
    #030712 0%,
    rgba(3, 7, 18, 0.8) 50%,
    transparent 100%
  );
}

/* Contact CTA background */
.gradient-dark-section {
  background: linear-gradient(
    to bottom right,
    #111827 0%,
    #1f2937 50%,
    #111827 100%
  );
}

/* Accent line (horizontal) */
.gradient-accent-line {
  background: linear-gradient(to right, #2563eb, #60a5fa);
}

/* Accent line (vertical) */
.gradient-accent-vertical {
  background: linear-gradient(to bottom, #2563eb, #60a5fa);
}

/* Accent fade */
.gradient-accent-fade {
  background: linear-gradient(
    to right,
    #2563eb,
    transparent
  );
}

/* Card subtle background */
.gradient-card-bg {
  background: linear-gradient(
    to bottom right,
    #f9fafb,
    #ffffff
  );
}

/* Icon hover background */
.gradient-icon-hover {
  background: linear-gradient(
    to bottom right,
    #2563eb,
    #1d4ed8
  );
}
```

### 5.2 Gradient Angle Standards

| Angle | Direction | Use Case |
|-------|-----------|----------|
| `to right` (90°) | Horizontal | Lines, buttons |
| `to bottom` (180°) | Vertical | Accent bars |
| `to bottom right` (135°) | Diagonal | Backgrounds, cards |
| Radial | Center-out | Spot highlights |

---

## 6. UI States

### 6.1 Interactive State Matrix

```
BUTTON STATE PROGRESSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

State       │ Background      │ Text      │ Shadow
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Default     │ gray-900        │ white     │ none
Hover       │ gray-800        │ white     │ subtle
Active      │ gray-950        │ white     │ inset
Focus       │ gray-900        │ white     │ ring-2
Disabled    │ gray-300        │ gray-500  │ none


INPUT STATE PROGRESSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

State       │ Border          │ Background │ Ring
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Default     │ gray-200        │ white      │ none
Hover       │ gray-300        │ white      │ none
Focus       │ gray-950        │ white      │ ring-2
Error       │ red-500         │ white      │ ring-2 red
Disabled    │ gray-200        │ gray-50    │ none
```

### 6.2 Focus Ring Standards

```css
/* Default focus ring */
.focus-ring {
  outline: none;
  ring: 2px solid #030712;        /* gray-950 */
  ring-offset: 2px solid white;
}

/* Blue focus ring (for light backgrounds) */
.focus-ring-accent {
  outline: none;
  ring: 2px solid #2563eb;        /* blue-600 */
  ring-offset: 2px solid white;
}
```

### 6.3 Error & Success States

```css
/* Error state */
.state-error {
  border-color: #dc2626;          /* red-600 */
  color: #dc2626;
}

/* Success state */
.state-success {
  border-color: #22c55e;          /* green-500 */
  color: #22c55e;
}

/* Warning state (if needed) */
.state-warning {
  border-color: #f59e0b;          /* amber-500 */
  color: #f59e0b;
}
```

---

## 7. Accessibility

### 7.1 Contrast Ratios

```
WCAG CONTRAST REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Level AA (minimum):
  • Normal text: 4.5:1
  • Large text (18px+ or 14px bold): 3:1
  • UI components: 3:1

Level AAA (enhanced):
  • Normal text: 7:1
  • Large text: 4.5:1


OUR PALETTE CONTRAST RATIOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Combination              │ Ratio  │ Level
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
gray-900 on white        │ 12.6:1 │ AAA ✅
gray-700 on white        │ 7.0:1  │ AAA ✅
gray-600 on white        │ 5.0:1  │ AA ✅
gray-500 on white        │ 4.6:1  │ AA (barely) ⚠️
blue-600 on white        │ 4.5:1  │ AA ✅
white on gray-900        │ 12.6:1 │ AAA ✅
white on blue-600        │ 4.5:1  │ AA ✅
blue-400 on gray-900     │ 6.7:1  │ AAA ✅
```

### 7.2 Color Blind Considerations

```
COLOR BLINDNESS SAFE PATTERNS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Never rely on color alone
   ❌ "Red fields have errors"
   ✅ "Fields with ⚠️ icon and red border have errors"

2. Use patterns + color
   ❌ Green checkmark only
   ✅ Green checkmark + "Success" text

3. Sufficient luminance difference
   Our blue (#2563eb) vs gray (#4b5563) have
   distinct luminance, visible to most color blindness types.

4. Test with simulators
   - Protanopia (red-blind)
   - Deuteranopia (green-blind)
   - Tritanopia (blue-blind)
```

### 7.3 Semantic Color Usage

| Color | Meaning | Never Use For |
|-------|---------|---------------|
| Blue | Interactive, accent, link | Errors, warnings |
| Red | Error, destructive | Success, neutral |
| Green | Success, positive | Errors, warnings |
| Gray | Neutral, disabled | Emphasis |

---

## 8. UX Patterns

### 8.1 Visual Hierarchy Techniques

```
HIERARCHY CREATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. SIZE HIERARCHY
   Hero:     text-7xl (76px)
   Section:  text-6xl (61px)
   Card:     text-3xl (31px)
   Body:     text-lg  (20px)
   Caption:  text-sm  (13px)

2. WEIGHT HIERARCHY
   Primary:   font-bold (700)
   Secondary: font-semibold (600)
   Body:      font-normal (400)
   Subtle:    font-light (300)

3. COLOR HIERARCHY
   Primary:   gray-900 (darkest)
   Secondary: gray-700
   Tertiary:  gray-600
   Muted:     gray-500
   Disabled:  gray-400

4. SPACING HIERARCHY
   Major:     mb-24 (96px) - Section breaks
   Standard:  mb-16 (64px) - Content blocks
   Minor:     mb-8  (32px) - Related elements
   Tight:     mb-4  (16px) - Inline groups
```

### 8.2 Attention Direction

```
DRAWING ATTENTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Technique        │ Strength │ Use Case
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Color contrast   │ High     │ CTAs, alerts
Size increase    │ High     │ Headlines
Motion           │ High     │ New content, errors
White space      │ Medium   │ Important content
Shadow/depth     │ Medium   │ Interactive elements
Border accent    │ Low      │ Subtle emphasis
Weight increase  │ Low      │ Inline emphasis

Order of application:
1. Start with size + weight
2. Add color if needed
3. Motion only for dynamic content
```

### 8.3 Call-to-Action Design

```
CTA BUTTON STANDARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Primary CTA (one per viewport):
  • Blue gradient background
  • White text
  • Shadow for depth
  • Full width on mobile
  • Icon + text

Secondary CTA:
  • Outline style
  • Gray text
  • No shadow
  • Adjacent to primary

Ghost CTA:
  • Transparent background
  • Underline on hover
  • Used in headers/navigation
```

### 8.4 Loading & Empty States

```
LOADING STATE PATTERNS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Skeleton:
  • gray-100 background
  • Pulse animation
  • Match layout dimensions

Spinner:
  • blue-600 color
  • 24px × 24px size
  • Linear rotation

Progress:
  • gray-100 track
  • blue-600 fill
  • Text percentage optional


EMPTY STATE PATTERNS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Structure:
  • Centered layout
  • Icon (gray-400, 48px)
  • Headline (text-xl, gray-900)
  • Description (text-sm, gray-600)
  • Action button (optional)
```

---

## Quick Reference Card

```
╔═══════════════════════════════════════════════════════════════╗
║                  COLOR & UX CHEAT SHEET                       ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  PRIMARY COLORS:                                              ║
║  ─────────────────                                            ║
║  Accent Blue   │ #2563eb (blue-600)   │ CTAs, links          ║
║  Primary Text  │ #111827 (gray-900)   │ Headings             ║
║  Body Text     │ #4b5563 (gray-600)   │ Paragraphs           ║
║  Background    │ #ffffff (white)      │ Canvas               ║
║  Subtle BG     │ #f9fafb (gray-50)    │ Sections             ║
║                                                               ║
║  CONTRAST RATIOS:                                             ║
║  ─────────────────                                            ║
║  gray-900 on white  │ 12.6:1 │ AAA ✅                         ║
║  blue-600 on white  │ 4.5:1  │ AA ✅                          ║
║  gray-500 on white  │ 4.6:1  │ AA (limit) ⚠️                  ║
║                                                               ║
║  SHADOWS:                                                     ║
║  ─────────────────                                            ║
║  Cards:  3-layer black shadow + white inset                   ║
║  CTAs:   2-layer blue shadow                                  ║
║  Text:   3-layer subtle shadow                                ║
║                                                               ║
║  GRADIENTS:                                                   ║
║  ─────────────────                                            ║
║  CTA Button:    from-blue-600 to-blue-700                     ║
║  Dark Section:  from-gray-900 via-gray-800 to-gray-900        ║
║  Accent Line:   from-blue-600 to-blue-400                     ║
║                                                               ║
║  STATES:                                                      ║
║  ─────────────────                                            ║
║  Hover:    Darken background 1 step                           ║
║  Focus:    ring-2 ring-gray-950 ring-offset-2                 ║
║  Disabled: opacity-50 pointer-events-none                     ║
║  Error:    border-red-500 text-red-600                        ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

*This guide covers color, shadow, and visual design patterns. For component structure, see [COMPONENTS-PRIMITIVES-CHILD-PARTS.md](./COMPONENTS-PRIMITIVES-CHILD-PARTS.md).*
