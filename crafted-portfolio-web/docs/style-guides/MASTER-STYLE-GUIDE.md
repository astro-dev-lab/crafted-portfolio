# 🏛️ MASTER STYLE GUIDE
## Crafted by Demetrius — Swiss Precision Design System

> *"Precision. Discipline. Intentional Engineering."*

---

## Table of Contents

1. [Philosophy & Principles](#1-philosophy--principles)
2. [Mathematical Foundations](#2-mathematical-foundations)
3. [Design System Architecture](#3-design-system-architecture)
4. [Implementation Phases](#4-implementation-phases)
5. [Related Guides](#5-related-guides)
6. [Governance & Evolution](#6-governance--evolution)

---

## 1. Philosophy & Principles

### 1.1 The Crafted Identity

**Crafted by Demetrius** is not just a brand—it's an engineering philosophy. Our design system embodies:

| Principle | Meaning | Implementation |
|-----------|---------|----------------|
| **Precision** | Every pixel is intentional | 8px mathematical grid, no arbitrary values |
| **Discipline** | Consistent, repeatable patterns | Variant factories, token-based design |
| **Intentional Engineering** | Purpose-driven decisions | Document the "why" for every choice |
| **Swiss Influence** | Clean, functional, timeless | Minimal ornamentation, maximum clarity |

### 1.2 Core Tenets

```
┌─────────────────────────────────────────────────────────────┐
│                    DESIGN HIERARCHY                         │
├─────────────────────────────────────────────────────────────┤
│  1. CLARITY    → Information is immediately understandable  │
│  2. HIERARCHY  → Visual weight guides the eye deliberately  │
│  3. RESTRAINT  → Every element earns its place             │
│  4. MOTION     → Animation serves purpose, never decorates │
│  5. ACCESSIBILITY → Design for all users, always           │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 The Swiss Design Influence

Our system draws from the International Typographic Style (Swiss Design) of the 1950s:

- **Grid-based layouts** → 8px mathematical grid
- **Sans-serif typography** → Geist font family
- **Objective photography** → Architectural imagery with grayscale treatment
- **Asymmetric balance** → Dynamic compositions with optical harmony
- **Minimal decoration** → Meaning through structure, not ornament

---

## 2. Mathematical Foundations

### 2.1 The 8px Grid Equation

All spatial values derive from a single mathematical formula:

```
Sₙ = 8 × n    where n ∈ ℤ⁺ (positive integers)

Spacing Scale:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
n=1   │ 8px    │ Micro spacing (gap-2)
n=2   │ 16px   │ Tight spacing (gap-4, p-4)
n=3   │ 24px   │ Small spacing (gap-6, p-6)
n=4   │ 32px   │ Standard spacing (gap-8)
n=6   │ 48px   │ Component spacing (p-12)
n=8   │ 64px   │ Section gaps (gap-16)
n=10  │ 80px   │ Major spacing (py-20)
n=12  │ 96px   │ Section margins (py-24)
n=16  │ 128px  │ Hero spacing (py-32)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2.2 Typography Scale (Perfect Fourth)

Based on the 1.25 ratio (musical perfect fourth interval):

```
Tₙ = T₀ × 1.25ⁿ    where T₀ = 16px (1rem)

Typography Scale:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
n=-2  │ 10px   │ text-xs     │ Fine print
n=-1  │ 13px   │ text-sm     │ Captions
n=0   │ 16px   │ text-base   │ Body text
n=1   │ 20px   │ text-lg     │ Lead text
n=2   │ 25px   │ text-xl     │ Subheads
n=3   │ 31px   │ text-2xl    │ Section titles
n=4   │ 39px   │ text-3xl    │ Major headings
n=5   │ 49px   │ text-4xl    │ Page titles
n=6   │ 61px   │ text-5xl/6xl│ Hero text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2.3 Timing Scale (Fibonacci-Derived)

Animation durations follow a modified Fibonacci sequence:

```
Animation Timing:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
100ms  │ micro     │ Hover, focus states
200ms  │ fast      │ Tooltips, small reveals
300ms  │ normal    │ Standard transitions
500ms  │ slow      │ Panel reveals, emphasis
800ms  │ hero      │ Page-level, single-use
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rule: UI animations ≤ 500ms (slow)
Exception: Hero animations at 800ms require justification
```

### 2.4 Color Mathematics

HSL-based systematic color generation:

```
Primary Blue Progression:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
H = 214° (constant hue)
S = 84%  (constant saturation)
L = 46%  │ swiss-accent-dark   │ #1d4ed8
L = 56%  │ swiss-accent        │ #2563eb
L = 66%  │ swiss-accent-light  │ #3b82f6
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rule: Lightness shifts by ±10% for state variations
```

---

## 3. Design System Architecture

### 3.1 Token Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    TOKEN ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Level 1: PRIMITIVES (Raw Values)                           │
│  ├── --color-swiss-accent: #2563eb                          │
│  ├── --spacing-swiss-6: 48px                                │
│  └── --text-swiss-xl: 1.563rem                              │
│                                                              │
│  Level 2: SEMANTIC TOKENS (Purpose)                         │
│  ├── --color-cta-primary: var(--color-swiss-accent)         │
│  ├── --spacing-card: var(--spacing-swiss-6)                 │
│  └── --text-heading: var(--text-swiss-4xl)                  │
│                                                              │
│  Level 3: COMPONENT TOKENS (Specific Use)                   │
│  ├── --btn-bg: var(--color-cta-primary)                     │
│  ├── --card-padding: var(--spacing-card)                    │
│  └── --hero-title-size: var(--text-heading)                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Component Composition Model

```
┌─────────────────────────────────────────────────────────────┐
│                    ATOMIC DESIGN LAYERS                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ATOMS (Primitives)                                         │
│  └── Button, Badge, Input, Separator, Avatar                │
│                                                              │
│  MOLECULES (Simple Compounds)                               │
│  └── Card, SwissServiceCard, FormField                      │
│                                                              │
│  ORGANISMS (Complex Compounds)                              │
│  └── StickyHeader, ContactForm, ServiceGrid                 │
│                                                              │
│  TEMPLATES (Page Sections)                                  │
│  └── Hero, AboutUsSwiss, WhyUs, CaseStudies, ContactCTA     │
│                                                              │
│  PAGES (Full Compositions)                                  │
│  └── Homepage, About, Blog, Personas                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Motion System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    MOTION ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CONSTANTS (Immutable)                                      │
│  ├── SWISS_TIMING: { micro, fast, normal, slow, hero }      │
│  ├── SWISS_EASING: { default, easeOut, easeIn, easeInOut }  │
│  └── SWISS_STAGGER: { tight, normal, relaxed, dramatic }    │
│                                                              │
│  FACTORIES (Configurable)                                   │
│  ├── createFadeVariants(duration)                           │
│  ├── createSlideUpVariants(distance, duration)              │
│  ├── createSlideInLeftVariants(distance, duration)          │
│  ├── createStaggerContainerVariants(stagger)                │
│  ├── createLetterVariants(baseDelay, perLetterDelay)        │
│  └── createWordVariants()                                   │
│                                                              │
│  ACCESSIBILITY (Always Respected)                           │
│  ├── prefersReducedMotion() — Static check                  │
│  ├── useReducedMotion() — Reactive hook                     │
│  └── getAccessibleVariants() — Automatic fallback           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Implementation Phases

### Phase 1: Foundation (Complete ✅)

**Goal:** Establish mathematical primitives and motion system

| Task | Status | Artifact |
|------|--------|----------|
| Define spacing scale (8px grid) | ✅ | `globals.css` @theme block |
| Define typography scale (1.25) | ✅ | `globals.css` @theme block |
| Create color tokens | ✅ | `globals.css` @theme block |
| Build motion library | ✅ | `src/lib/motion.ts` |
| Reactive reduced motion hook | ✅ | `useReducedMotion()` |

### Phase 2: Pilot Component (Complete ✅)

**Goal:** Validate system with one complex component

| Task | Status | Artifact |
|------|--------|----------|
| Create AboutUsSwiss section | ✅ | `AboutUsSwiss.tsx` |
| Extract SwissServiceCard | ✅ | `SwissServiceCard.tsx` |
| Feature flag integration | ✅ | `USE_SWISS_DESIGN` |
| Swiss grid validation | ✅ | All spacing 8px-compliant |

### Phase 3: Documentation (In Progress 🔄)

**Goal:** Create comprehensive, actionable style guides

| Task | Status | Artifact |
|------|--------|----------|
| Master Style Guide | ✅ | `MASTER-STYLE-GUIDE.md` |
| Homepage Guide | 🔄 | `HOMEPAGE-SPECIFIC-GUIDE.md` |
| Timing Guide | 🔄 | `TIMING-SPECIFIC-GUIDE.md` |
| Animation Guide | 🔄 | `ANIMATION-SPECIFIC-GUIDE.md` |
| Components Guide | 🔄 | `COMPONENTS-PRIMITIVES-CHILD-PARTS.md` |
| Color/UX Guide | 🔄 | `COLOR-STYLE-ACCENT-UI-UX.md` |

### Phase 4: Component Migration (Planned 📋)

**Goal:** Migrate all UI components to Swiss system

| Task | Priority | Complexity |
|------|----------|------------|
| Button → SwissButton | High | Low |
| Card → SwissCard | High | Medium |
| Hero → HeroSwiss | High | High |
| WhyUs → WhyUsSwiss | Medium | Medium |
| CaseStudies → CaseStudiesSwiss | Medium | Medium |
| TechStack → TechStackSwiss | Low | Low |
| ContactCTA → ContactCTASwiss | Medium | High |

### Phase 5: Validation & Testing (Planned 📋)

**Goal:** Ensure system integrity and accessibility

| Task | Method |
|------|--------|
| Visual regression tests | Playwright/Chromatic |
| Accessibility audits | axe-core, Lighthouse |
| Performance budgets | Core Web Vitals monitoring |
| Design token validation | Automated 8px grid checks |

---

## 5. Related Guides

| Guide | Purpose | Link |
|-------|---------|------|
| **Homepage Guide** | Section-by-section homepage design | [HOMEPAGE-SPECIFIC-GUIDE.md](./HOMEPAGE-SPECIFIC-GUIDE.md) |
| **Timing Guide** | Animation duration principles | [TIMING-SPECIFIC-GUIDE.md](./TIMING-SPECIFIC-GUIDE.md) |
| **Animation Guide** | Easing, variants, and patterns | [ANIMATION-SPECIFIC-GUIDE.md](./ANIMATION-SPECIFIC-GUIDE.md) |
| **Components Guide** | Primitives and composition | [COMPONENTS-PRIMITIVES-CHILD-PARTS.md](./COMPONENTS-PRIMITIVES-CHILD-PARTS.md) |
| **Color & UX Guide** | Palette, shadows, and states | [COLOR-STYLE-ACCENT-UI-UX.md](./COLOR-STYLE-ACCENT-UI-UX.md) |

---

## 6. Governance & Evolution

### 6.1 Change Process

```
┌─────────────────────────────────────────────────────────────┐
│                    TOKEN CHANGE WORKFLOW                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. PROPOSE                                                  │
│     └── Document the problem and proposed solution           │
│                                                              │
│  2. VALIDATE                                                 │
│     └── Ensure mathematical compliance (8px, 1.25, etc.)     │
│                                                              │
│  3. PROTOTYPE                                                │
│     └── Test in isolated component                           │
│                                                              │
│  4. REVIEW                                                   │
│     └── Check accessibility and consistency                  │
│                                                              │
│  5. DOCUMENT                                                 │
│     └── Update relevant style guides                         │
│                                                              │
│  6. MIGRATE                                                  │
│     └── Apply to affected components                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Forbidden Patterns

| ❌ Anti-Pattern | ✅ Correct Approach |
|-----------------|---------------------|
| Magic numbers (e.g., `margin: 15px`) | Use 8px grid: `mb-4` (16px) |
| Arbitrary colors | Use design tokens |
| Inline animation durations | Use `SWISS_TIMING` constants |
| Custom easing curves | Use `SWISS_EASING` presets |
| Skip reduced motion check | Use `useReducedMotion()` hook |

### 6.3 Version Control

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-05 | Initial Swiss Design System foundation |
| 1.1.0 | — | Component migration complete |
| 2.0.0 | — | Full site Swiss compliance |

---

## Appendix: Quick Reference Card

```
╔═══════════════════════════════════════════════════════════════╗
║              SWISS DESIGN SYSTEM CHEAT SHEET                  ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  SPACING:  S = 8n  →  8, 16, 24, 32, 48, 64, 80, 96, 128     ║
║  TYPOGRAPHY: T = 16 × 1.25ⁿ  →  10, 13, 16, 20, 25, 31, 39...║
║  TIMING:  100, 200, 300, 500, 800 (ms)                        ║
║  EASING:  cubic-bezier(0.25, 0.46, 0.45, 0.94)               ║
║  STAGGER: 0.05, 0.08, 0.12, 0.15 (s)                         ║
║  COLORS:  Blue #2563eb  |  Dark #111827  |  Light #f3f4f6    ║
║                                                               ║
║  RULE: If the value isn't derived from a formula, question it║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

*This document is the source of truth for the Crafted by Demetrius design system. All other guides derive from and support the principles established here.*
