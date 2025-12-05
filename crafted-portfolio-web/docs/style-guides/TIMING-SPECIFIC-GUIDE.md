# ⏱️ TIMING-SPECIFIC GUIDE
## Swiss Precision Animation Duration System

> *"Duration is not a guess—it's a calculation. Every millisecond is accounted for."*

---

## Table of Contents

1. [Timing Philosophy](#1-timing-philosophy)
2. [The Swiss Timing Scale](#2-the-swiss-timing-scale)
3. [Duration Selection Matrix](#3-duration-selection-matrix)
4. [Timing Mathematics](#4-timing-mathematics)
5. [Implementation Patterns](#5-implementation-patterns)
6. [Anti-Patterns](#6-anti-patterns)

---

## 1. Timing Philosophy

### 1.1 Core Principles

Animation duration in the Swiss system follows three immutable laws:

```
┌─────────────────────────────────────────────────────────────┐
│                    THE THREE TIMING LAWS                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  LAW 1: PERCEPTION                                          │
│  ────────────────────                                       │
│  Animations under 100ms feel instantaneous.                 │
│  Animations over 500ms feel sluggish for UI.                │
│  The sweet spot is 200-400ms for most interactions.         │
│                                                              │
│  LAW 2: PROPORTIONALITY                                     │
│  ────────────────────                                       │
│  Duration scales with distance and importance.              │
│  Small movements = short durations.                         │
│  Large movements = longer durations.                        │
│                                                              │
│  LAW 3: CONSISTENCY                                         │
│  ────────────────────                                       │
│  Similar elements use identical timing.                     │
│  Timing creates rhythm and predictability.                  │
│  Variation requires explicit justification.                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Psychological Thresholds

| Threshold | Duration | User Perception |
|-----------|----------|-----------------|
| Instantaneous | < 100ms | No delay perceived |
| Immediate | 100-300ms | System is responding |
| Animated | 300-500ms | Something is happening |
| Deliberate | 500-800ms | Attention is being drawn |
| Slow | > 800ms | System feels sluggish |

---

## 2. The Swiss Timing Scale

### 2.1 Official Constants

```typescript
// Source: src/lib/motion.ts

export const SWISS_TIMING = {
  micro:  100,  // 100ms - Hover states, button feedback
  fast:   200,  // 200ms - Tooltips, small UI changes
  normal: 300,  // 300ms - Component state changes
  slow:   500,  // 500ms - Panel reveals, emphasis
  hero:   800,  // 800ms - Page-level, single-use reveals
} as const;

// Maximum UI duration
export const MAX_UI_DURATION = SWISS_TIMING.slow; // 500ms
```

### 2.2 Visual Timing Scale

```
SWISS TIMING SCALE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

     100ms    200ms    300ms    400ms    500ms    600ms    700ms    800ms
       │        │        │        │        │        │        │        │
       ▼        ▼        ▼        ▼        ▼        ▼        ▼        ▼
  ┌────────┬────────┬────────┬────────┬────────┬────────┬────────┬────────┐
  │ MICRO  │  FAST  │ NORMAL │        │  SLOW  │        │        │  HERO  │
  │  ●     │   ●    │    ●   │        │    ●   │        │        │    ●   │
  └────────┴────────┴────────┴────────┴────────┴────────┴────────┴────────┘
       │        │        │                 │                          │
       │        │        │                 │                          │
    Hover   Tooltips  Standard      Emphasis              Page-level reveals
   States   Dropdowns Transitions   Panel reveals         (requires justification)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Note: The scale is NOT linear. It follows a modified Fibonacci progression.
```

### 2.3 Mathematical Derivation

```
FIBONACCI-BASED TIMING PROGRESSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Standard Fibonacci: 1, 1, 2, 3, 5, 8, 13, 21...

Swiss Modification:
  T₁ = 100ms (base unit)
  T₂ = 200ms (1 + 1 = 2 → 200)
  T₃ = 300ms (1 + 2 = 3 → 300)
  T₄ = 500ms (2 + 3 = 5 → 500)
  T₅ = 800ms (3 + 5 = 8 → 800)

Relationship: Tₙ ≈ Tₙ₋₁ + Tₙ₋₂

Exception: T₃ uses 300 instead of Fibonacci 400
Reason: 300ms is the perceptual "goldilocks zone"
```

---

## 3. Duration Selection Matrix

### 3.1 By Interaction Type

| Interaction | Duration | Constant | Rationale |
|-------------|----------|----------|-----------|
| Button hover | 100ms | `micro` | Instant feedback |
| Button click | 100ms | `micro` | Confirm action |
| Focus ring | 100ms | `micro` | Accessibility cue |
| Tooltip show | 200ms | `fast` | Quick reveal |
| Dropdown open | 200ms | `fast` | Menu access |
| Tab change | 200ms | `fast` | Navigation |
| Modal open | 300ms | `normal` | Content focus |
| Accordion | 300ms | `normal` | Content reveal |
| Card hover lift | 300ms | `normal` | Engagement cue |
| Sidebar slide | 500ms | `slow` | Major UI change |
| Page section | 500ms | `slow` | Scroll-triggered |
| Hero reveal | 800ms | `hero` | First impression |

### 3.2 By Element Size/Distance

```
DISTANCE-DURATION RELATIONSHIP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Formula: Duration = base + (distance / 100) × 50ms

Examples:
  8px movement   → 100ms + (8/100 × 50)   = 104ms  → use 100ms
  32px movement  → 100ms + (32/100 × 50)  = 116ms  → use 100-200ms
  64px movement  → 100ms + (64/100 × 50)  = 132ms  → use 200ms
  128px movement → 100ms + (128/100 × 50) = 164ms  → use 200-300ms
  256px movement → 100ms + (256/100 × 50) = 228ms  → use 300ms
  512px movement → 100ms + (512/100 × 50) = 356ms  → use 400-500ms

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Snap to nearest Swiss timing value.
```

### 3.3 By Visual Importance

| Importance Level | Max Duration | Use Case |
|------------------|--------------|----------|
| **Critical** | 100ms | User needs immediate feedback |
| **High** | 200ms | Navigation, state changes |
| **Medium** | 300ms | Content reveals, transitions |
| **Low** | 500ms | Decorative, emphasis |
| **Hero** | 800ms | First load, one-time reveals |

---

## 4. Timing Mathematics

### 4.1 Stagger Calculations

```typescript
// Stagger timing for lists
SWISS_STAGGER = {
  tight:    0.05,  // 50ms between items
  normal:   0.08,  // 80ms between items
  relaxed:  0.12,  // 120ms between items
  dramatic: 0.15,  // 150ms between items
} as const;

// Total animation duration formula:
// D_total = D_single + (n - 1) × stagger_delay

// Example: 4 items with 'normal' stagger and 'normal' duration
// D_total = 300ms + (4 - 1) × 80ms
// D_total = 300ms + 240ms = 540ms
```

### 4.2 Stagger Selection Guide

```
STAGGER SELECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Number of items determines stagger:
  2-3 items  → tight (0.05s)   → Quick cascade
  4-6 items  → normal (0.08s)  → Comfortable reading
  7-10 items → relaxed (0.12s) → Visual breathing room
  10+ items  → dramatic (0.15s) or paginate

Total time budget:
  Target: Keep total animation under 1.5 seconds
  10 items × 0.15s stagger = 1.35s + 300ms = 1.65s ⚠️ borderline
  Consider: Progressive reveal or viewport-based triggering
```

### 4.3 Responsive Timing Adjustments

```
VIEWPORT-BASED TIMING (Optional)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Mobile (< 768px):
  Consider reducing durations by 20% for snappier feel
  Reason: Smaller movements, touch-based interaction

Desktop (> 1024px):
  Standard Swiss timing
  Larger screen = more visual distance = standard timing

Example:
  const duration = isMobile 
    ? SWISS_TIMING.normal * 0.8  // 240ms
    : SWISS_TIMING.normal;       // 300ms
```

---

## 5. Implementation Patterns

### 5.1 Using SWISS_TIMING in Components

```typescript
// ✅ CORRECT: Use constants
import { SWISS_TIMING, SWISS_EASING } from '@/lib/motion';

// In Framer Motion
const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: SWISS_TIMING.normal / 1000, // Convert to seconds
      ease: SWISS_EASING.default,
    },
  },
};

// In CSS-in-JS
style={{
  transitionDuration: `${SWISS_TIMING.normal}ms`,
}}

// In Tailwind (via CSS variable)
className="transition-all"
style={{ transitionDuration: `${SWISS_TIMING.slow}ms` }}
```

### 5.2 Pre-built Transition Presets

```typescript
// Source: src/lib/motion.ts

export const SWISS_TRANSITIONS = {
  micro:  { duration: 0.1,  ease: SWISS_EASING.default },
  fast:   { duration: 0.2,  ease: SWISS_EASING.default },
  normal: { duration: 0.3,  ease: SWISS_EASING.default },
  slow:   { duration: 0.5,  ease: SWISS_EASING.default },
  hero:   { duration: 0.8,  ease: SWISS_EASING.default },
} as const;

// Usage
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={SWISS_TRANSITIONS.normal}
/>
```

### 5.3 CSS Custom Property Usage

```css
/* In globals.css */
:root {
  --duration-micro: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-hero: 800ms;
}

/* In components */
.button {
  transition-duration: var(--duration-micro);
}

.modal {
  transition-duration: var(--duration-normal);
}
```

---

## 6. Anti-Patterns

### 6.1 Forbidden Timing Values

```
❌ FORBIDDEN VALUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Never use these arbitrary values:
  150ms  → Use 100ms or 200ms
  250ms  → Use 200ms or 300ms
  350ms  → Use 300ms or 500ms
  400ms  → Use 300ms or 500ms
  450ms  → Use 500ms
  600ms  → Use 500ms or 800ms
  700ms  → Use 500ms or 800ms

Exception: Calculated values from formulas
  e.g., stagger × index may produce 240ms
  This is acceptable as it's mathematically derived.
```

### 6.2 Common Mistakes

| ❌ Anti-Pattern | ✅ Correct Approach | Why |
|-----------------|---------------------|-----|
| `transition: all 0.3s` | `transition-duration: ${SWISS_TIMING.normal}ms` | Use constant |
| Hard-coded `150ms` | Round to `100ms` or `200ms` | Swiss scale only |
| `duration: 1s` | `duration: 0.8` (hero) or split animation | Max is 800ms |
| Different durations for same element type | Consistent timing per element class | Predictability |
| No reduced motion check | Use `useReducedMotion()` | Accessibility |

### 6.3 Performance Gotchas

```
⚠️ PERFORMANCE CONSIDERATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. LONG DURATIONS + COMPLEX ANIMATIONS
   Problem: 800ms animation with multiple properties
   Solution: Limit hero timing to simple opacity/transform

2. STAGGER ON MANY ITEMS
   Problem: 20 items × 150ms = 3 seconds total
   Solution: Cap at 10 items or use intersection observer

3. LAYOUT ANIMATIONS
   Problem: Animating width/height causes reflow
   Solution: Use transform: scale() instead

4. SIMULTANEOUS ANIMATIONS
   Problem: Multiple 500ms animations competing
   Solution: Stagger or sequence them

5. MOBILE PERFORMANCE
   Problem: Complex animations on low-end devices
   Solution: Reduce motion or simplify on mobile
```

---

## Quick Reference Card

```
╔═══════════════════════════════════════════════════════════════╗
║                  SWISS TIMING CHEAT SHEET                     ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  TIMING CONSTANTS:                                            ║
║  ─────────────────                                            ║
║  micro  = 100ms  │  Hover, focus, micro-feedback              ║
║  fast   = 200ms  │  Tooltips, dropdowns, tabs                 ║
║  normal = 300ms  │  Standard transitions, modals              ║
║  slow   = 500ms  │  Emphasis, panels, scroll-reveal           ║
║  hero   = 800ms  │  One-time hero reveals (justify use)       ║
║                                                               ║
║  STAGGER VALUES:                                              ║
║  ─────────────────                                            ║
║  tight    = 50ms   │  2-3 items                               ║
║  normal   = 80ms   │  4-6 items                               ║
║  relaxed  = 120ms  │  7-10 items                              ║
║  dramatic = 150ms  │  Hero sections                           ║
║                                                               ║
║  RULES:                                                       ║
║  ─────────────────                                            ║
║  • UI animations ≤ 500ms (MAX_UI_DURATION)                    ║
║  • Hero timing requires justification                         ║
║  • Always check reduced motion preference                     ║
║  • Snap to Swiss scale, never arbitrary values                ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

*This guide defines animation duration standards. For easing curves and motion patterns, see [ANIMATION-SPECIFIC-GUIDE.md](./ANIMATION-SPECIFIC-GUIDE.md).*
