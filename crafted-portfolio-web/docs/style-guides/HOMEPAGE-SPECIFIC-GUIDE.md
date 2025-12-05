# 🏠 HOMEPAGE-SPECIFIC GUIDE
## Section-by-Section Design Specifications

> *The homepage is the flagship implementation of Swiss precision—every section choreographed for maximum impact.*

---

## Table of Contents

1. [Page Architecture](#1-page-architecture)
2. [Section Specifications](#2-section-specifications)
3. [Visual Flow & Rhythm](#3-visual-flow--rhythm)
4. [Responsive Breakpoints](#4-responsive-breakpoints)
5. [Performance Budgets](#5-performance-budgets)

---

## 1. Page Architecture

### 1.1 Section Order

```
┌─────────────────────────────────────────────────────────────┐
│                    HOMEPAGE STRUCTURE                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  1. STICKY HEADER                                    │    │
│  │     └── Transparent → Solid on scroll                │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  2. HERO SECTION                                     │    │
│  │     └── Full viewport, 3D scene, gradient overlay    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  3. ANGLE DIVIDER                                    │    │
│  │     └── Transition from dark to light                │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  4. ABOUT US (Swiss)                                 │    │
│  │     └── Who we are, service cards, manifesto         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  5. WHY US                                           │    │
│  │     └── Value propositions grid                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  6. CASE STUDIES                                     │    │
│  │     └── Interactive demo previews                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  7. TECH STACK                                       │    │
│  │     └── Technology categories grid                   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  8. CONTACT CTA                                      │    │
│  │     └── Dark section with contact form               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  9. AI ASSISTANT                                     │    │
│  │     └── Floating assistant component                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  10. FOOTER                                          │    │
│  │     └── Minimal copyright                            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Color Rhythm

```
Section Background Alternation:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hero          │ ████████ │ gray-950 (dark)
AngleDivider  │ ▓▓▓▓░░░░ │ Gradient transition
AboutUsSwiss  │ ░░░░░░░░ │ white
WhyUs         │ ░░░░░░░░ │ white (default)
CaseStudies   │ ▒▒▒▒▒▒▒▒ │ gray-50 (subtle)
TechStack     │ ░░░░░░░░ │ white (default)
ContactCTA    │ ████████ │ gray-900 gradient (dark)
Footer        │ ▒▒▒▒▒▒▒▒ │ gray-50
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pattern: Dark → Light → Subtle → Light → Dark → Subtle
Creates visual breathing and section distinction.
```

---

## 2. Section Specifications

### 2.1 Hero Section

**File:** `src/components/sections/Hero.tsx`

| Property | Value | Swiss Compliance |
|----------|-------|------------------|
| **Height** | `h-screen` (100vh) | — |
| **Background** | `bg-gray-950` + 3D HeroScene | — |
| **Overlay** | `from-gray-950 via-gray-950/80 to-transparent` | — |
| **Content width** | max-w-7xl | — |
| **Headline size** | `text-5xl lg:text-7xl` | ✅ Scale step 6 |
| **Body size** | `text-xl lg:text-2xl` | ✅ Scale step 2 |
| **Accent color** | `text-blue-500` | ✅ Accent light |
| **CTA buttons** | 2 buttons, primary + ghost | — |

**Typography Hierarchy:**
```
HERO TYPOGRAPHY STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
H1: "We Build Enterprise-Grade..."
    text-5xl lg:text-7xl font-bold leading-tight text-white
    ↳ ~61-76px, maximum impact

BODY: "From secure operations portals..."
    text-xl lg:text-2xl text-gray-300
    ↳ ~20-31px, comfortable reading

CTA: "Get Started" / "Browse Case Studies"
    text-sm font-medium (inside Button)
    ↳ ~13px, clear action
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Animation Pattern:**
- Container: 0.8s duration, staggerChildren: 0.2s
- Individual items: slideUp with 30px distance
- Buttons: Additional 0.3s delay

---

### 2.2 AngleDivider

**File:** `src/components/ui/AngleDivider.tsx`

| Property | Value |
|----------|-------|
| **From Color** | `#030712` (gray-950) |
| **To Color** | `#ffffff` (white) |
| **Angle** | Diagonal SVG clip path |
| **Purpose** | Smooth dark→light transition |

---

### 2.3 AboutUsSwiss Section

**File:** `src/components/sections/AboutUsSwiss.tsx`

| Property | Value | Swiss Compliance |
|----------|-------|------------------|
| **Background** | `bg-white` | — |
| **Padding** | `py-20 lg:py-32` (80/128px) | ✅ 8×10, 8×16 |
| **Container** | max-w-7xl | — |
| **Headline size** | `text-4xl lg:text-6xl` | ✅ Scale step 5-6 |
| **Body lead** | `text-xl lg:text-2xl` | ✅ Scale step 2 |
| **Body** | `text-lg` | ✅ Scale step 1 |
| **Accent** | `text-blue-600` | ✅ Accent primary |

**Layout Structure:**
```
ABOUTUSSWISS LAYOUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────────────────────────────────────┐
│  HEADLINE BLOCK (mb-20 = 80px)              │
│  ├── "Precision. Discipline." (gray-900)    │
│  ├── "Intentional Engineering." (blue-600)  │
│  └── Accent line (4px gradient)             │
├─────────────────────────────────────────────┤
│  NARRATIVE BLOCK (mb-24 = 96px)             │
│  ├── Blue vertical border (left)            │
│  └── 3 paragraphs with pl-12/16 (48/64px)   │
├─────────────────────────────────────────────┤
│  SERVICE CARDS (2-col grid, gap-12 = 48px)  │
│  ├── Enterprise Clients                     │
│  └── Local & Growing Brands                 │
├─────────────────────────────────────────────┤
│  MANIFESTO (pt-20 = 80px)                   │
│  ├── "We build with discipline."            │
│  ├── "We build with purpose."               │
│  ├── "We build for the way..."              │
│  └── Signature line                         │
└─────────────────────────────────────────────┘
```

**Special Effects:**
- Letter-by-letter reveal for "Intentional Engineering"
- Word-by-word 3D rotation for manifesto lines
- Glowing blue vertical border
- Layered text shadows

---

### 2.4 WhyUs Section

**File:** `src/components/sections/WhyUs.tsx`

| Property | Value | Swiss Compliance |
|----------|-------|------------------|
| **Background** | white (default Section) | — |
| **Padding** | `py-16 lg:py-24` (64/96px) | ✅ 8×8, 8×12 |
| **Grid** | 2 columns, gap-6 (24px) | ✅ 8×3 |
| **Card padding** | p-6 (24px) | ✅ 8×3 |

**Card Pattern:**
```
WHY-US CARD ANATOMY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────────────────────────────────────┐
│  Badge (category label)                     │
│  Title (text-2xl font-semibold)             │
│  Description (text-sm text-gray-600)        │
│  ─────────────────────────────────────────  │
│  Feature list (•••)                         │
└─────────────────────────────────────────────┘
```

---

### 2.5 CaseStudies Section

**File:** `src/components/sections/CaseStudies.tsx`

| Property | Value | Swiss Compliance |
|----------|-------|------------------|
| **Background** | `bg-gray-50` | — |
| **Grid** | 3 columns | — |
| **Animation** | Hover shadow + translate-y | — |
| **Card style** | Emoji icon, dual badge | — |

**Migration Priority:** Medium — needs Swiss card extraction

---

### 2.6 TechStack Section

**File:** `src/components/sections/TechStack.tsx`

| Property | Value | Swiss Compliance |
|----------|-------|------------------|
| **Background** | white (default) | — |
| **Grid** | 4 columns | — |
| **Categories** | Frontend, Backend, Infrastructure, AI/ML | — |
| **Philosophy block** | `bg-blue-50` | — |

**Migration Priority:** Low — mostly compliant

---

### 2.7 ContactCTA Section

**File:** `src/components/sections/ContactCTA.tsx`

| Property | Value | Swiss Compliance |
|----------|-------|------------------|
| **Background** | `bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900` | — |
| **Text** | `text-white`, accent: `text-blue-400` | — |
| **Layout** | 2-column: Content + Form | — |
| **Form card** | bg-white with shadow | — |

**Migration Priority:** Medium — needs spacing audit

---

## 3. Visual Flow & Rhythm

### 3.1 Vertical Spacing Rhythm

```
SECTION SPACING PATTERN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                         
Hero         │ h-screen (100vh)           │ Full impact
             │                            │
AngleDivider │ ~64px height               │ Transition
             │                            │
AboutUsSwiss │ py-20 lg:py-32 (80/128px)  │ Major section
             │                            │
WhyUs        │ py-16 lg:py-24 (64/96px)   │ Standard section
             │                            │
CaseStudies  │ py-16 lg:py-24 (64/96px)   │ Standard section
             │                            │
TechStack    │ py-16 lg:py-24 (64/96px)   │ Standard section
             │                            │
ContactCTA   │ py-16 lg:py-24 (64/96px)   │ Standard section
             │                            │
Footer       │ py-8 (32px)                │ Minimal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total estimated scroll: ~2500-3000px on desktop
```

### 3.2 Typography Size Flow

```
HEADING PROGRESSION DOWN PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hero H1      │ text-7xl  │ ~76px │ Maximum
About H2     │ text-6xl  │ ~61px │ Major emphasis
Manifesto    │ text-4xl  │ ~39px │ Statement
Section H2   │ text-4xl  │ ~39px │ Standard sections
Card Title   │ text-3xl  │ ~31px │ Component level
Subhead      │ text-xl   │ ~25px │ Supporting
Body         │ text-lg   │ ~20px │ Reading
Small        │ text-sm   │ ~13px │ Details
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hierarchy ratio maintained: ~1.25x between levels
```

---

## 4. Responsive Breakpoints

### 4.1 Tailwind Breakpoints

| Breakpoint | Min Width | Ratio from Previous |
|------------|-----------|---------------------|
| sm | 640px | — |
| md | 768px | 1.2x |
| lg | 1024px | 1.33x |
| xl | 1280px | 1.25x |
| 2xl | 1536px | 1.2x |

### 4.2 Section-Specific Responsive Rules

```
RESPONSIVE TYPOGRAPHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Component        │ Mobile (< lg) │ Desktop (lg+)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hero H1          │ text-5xl      │ text-7xl
About H2         │ text-4xl      │ text-6xl
Manifesto        │ text-3xl      │ text-4xl
Section padding  │ py-16/py-20   │ py-24/py-32
Grid columns     │ 1 col         │ 2-4 cols
Container px     │ px-4          │ px-6 → px-8
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 4.3 Mobile-First Considerations

```
MOBILE ADJUSTMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Hero: Overlay covers more to ensure text readability
• AboutUsSwiss: Single column service cards
• Manifesto image: hidden (lg:block only)
• Grid layouts: Stack to single column
• Touch targets: Minimum 44×44px
• Reduced motion: Consider auto-enabling on mobile
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 5. Performance Budgets

### 5.1 Core Web Vitals Targets

| Metric | Target | Current Strategy |
|--------|--------|------------------|
| **LCP** | < 2.5s | Hero optimized, critical CSS inline |
| **FID** | < 100ms | Minimal JS in critical path |
| **CLS** | < 0.1 | Fixed dimensions, font loading strategy |
| **INP** | < 200ms | Event delegation, passive listeners |

### 5.2 Asset Budgets

```
ASSET BUDGET ALLOCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Category         │ Budget    │ Notes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JavaScript       │ < 150KB   │ Gzipped, code-split
CSS              │ < 30KB    │ Tailwind purged
Fonts            │ < 50KB    │ Subset, woff2 only
Hero images      │ < 100KB   │ WebP, responsive
Other images     │ < 200KB   │ Lazy loaded
3D Scene         │ < 100KB   │ Compressed, progressive
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total initial    │ < 300KB   │ Above fold only
```

### 5.3 Animation Performance Rules

```
ANIMATION PERFORMANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ ALLOWED (GPU-accelerated):
   • transform (translate, scale, rotate)
   • opacity
   • filter (with caution)

⚠️ USE SPARINGLY:
   • box-shadow (composite layer)
   • background-color

❌ AVOID:
   • width, height changes
   • top, left, right, bottom
   • font-size animation
   • layout-triggering properties
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Appendix: Homepage Checklist

```
PRE-LAUNCH CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ All sections use 8px grid spacing
□ Typography follows 1.25 scale
□ Animations use SWISS_TIMING constants
□ Reduced motion support tested
□ Mobile responsive tested (320-768px)
□ Tablet responsive tested (768-1024px)
□ Desktop tested (1024px+)
□ LCP < 2.5s verified
□ CLS < 0.1 verified
□ Accessibility audit passed
□ Color contrast ratios verified
□ Keyboard navigation tested
□ Screen reader tested
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

*This guide provides section-specific implementation details for the homepage. For foundational principles, see [MASTER-STYLE-GUIDE.md](./MASTER-STYLE-GUIDE.md).*
