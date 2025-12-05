# 🎬 ANIMATION-SPECIFIC GUIDE
## Swiss Motion Design System

> *"Motion is communication. Every curve tells a story of physics, every delay creates rhythm."*

---

## Table of Contents

1. [Motion Philosophy](#1-motion-philosophy)
2. [Easing Curves](#2-easing-curves)
3. [Variant Factory System](#3-variant-factory-system)
4. [Animation Patterns](#4-animation-patterns)
5. [Accessibility](#5-accessibility)
6. [Advanced Techniques](#6-advanced-techniques)

---

## 1. Motion Philosophy

### 1.1 The Physics of Feel

Swiss motion design is grounded in natural physics. Objects in the real world don't move linearly—they accelerate, decelerate, and sometimes overshoot. Our easing curves model these behaviors.

```
┌─────────────────────────────────────────────────────────────┐
│                    MOTION PRINCIPLES                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. NATURAL PHYSICS                                         │
│     Objects decelerate as they approach destination          │
│     Entry = fast start, slow finish (ease-out)              │
│     Exit = slow start, fast finish (ease-in)                │
│                                                              │
│  2. PURPOSEFUL MOTION                                       │
│     Every animation communicates something:                  │
│     • Feedback: "Your action was received"                  │
│     • Guidance: "Look here next"                            │
│     • Continuity: "This connects to that"                   │
│                                                              │
│  3. INVISIBLE WHEN WORKING                                  │
│     Good animation is felt, not noticed                      │
│     If users comment on animation, it's probably wrong      │
│                                                              │
│  4. RESPECT FOR TIME                                        │
│     Never waste user's time with decoration                 │
│     Animation should feel faster than no animation          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Motion Hierarchy

```
MOTION IMPORTANCE LEVELS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Level 1: FUNCTIONAL (Required)
  └── State feedback, loading indicators, navigation
  └── These MUST exist for usability

Level 2: GUIDING (Recommended)
  └── Scroll reveals, attention direction
  └── Improve comprehension and flow

Level 3: DELIGHTFUL (Optional)
  └── Micro-interactions, easter eggs
  └── Add personality, can be disabled

Level 4: DECORATIVE (Avoid)
  └── Motion for motion's sake
  └── Remove unless justified
```

---

## 2. Easing Curves

### 2.1 Swiss Easing Constants

```typescript
// Source: src/lib/motion.ts

export const SWISS_EASING = {
  /** Primary Swiss curve: smooth deceleration */
  default: [0.25, 0.46, 0.45, 0.94] as const,
  
  /** Ease out: natural deceleration for entrances */
  easeOut: [0.22, 0.61, 0.36, 1] as const,
  
  /** Ease in: natural acceleration for exits */
  easeIn: [0.55, 0.06, 0.68, 0.19] as const,
  
  /** Ease in-out: symmetric, for position changes */
  easeInOut: [0.65, 0, 0.35, 1] as const,
} as const;

// CSS Custom Property
// --ease-swiss: cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### 2.2 Visual Curve Comparison

```
EASING CURVE VISUALIZATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

default (0.25, 0.46, 0.45, 0.94)
Progress: ▁▂▃▄▅▆▇█████████████████████
Motion:   Accelerates gently, decelerates smoothly
Use:      General purpose, default choice

easeOut (0.22, 0.61, 0.36, 1)
Progress: ▁▄▆███████████████████████████
Motion:   Quick start, long gentle stop
Use:      Elements entering the viewport

easeIn (0.55, 0.06, 0.68, 0.19)
Progress: ▁▁▁▁▁▂▂▂▃▃▄▅▆▇█████████████
Motion:   Slow start, accelerates out
Use:      Elements leaving the viewport

easeInOut (0.65, 0, 0.35, 1)
Progress: ▁▁▂▃▅▇████████████████▇▅▃▂▁▁
Motion:   Symmetric acceleration/deceleration
Use:      Position changes, morphing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2.3 Mathematical Basis

```
CUBIC BEZIER MATHEMATICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A cubic bezier curve is defined by 4 control points:
  P0 = (0, 0)     - Start (fixed)
  P1 = (x1, y1)   - First control point
  P2 = (x2, y2)   - Second control point
  P3 = (1, 1)     - End (fixed)

The curve formula:
  B(t) = (1-t)³P0 + 3(1-t)²tP1 + 3(1-t)t²P2 + t³P3

For SWISS_EASING.default (0.25, 0.46, 0.45, 0.94):
  P1 = (0.25, 0.46) - Gentle initial acceleration
  P2 = (0.45, 0.94) - Strong deceleration approaching end

Velocity at any point:
  v(t) = d/dt[B(t)]
  
Peak velocity occurs around t=0.3-0.4 (early in animation)
Velocity approaches zero as t→1 (smooth landing)
```

### 2.4 Easing Selection Guide

| Animation Type | Recommended Easing | Rationale |
|----------------|-------------------|-----------|
| Element appears | `easeOut` | Quick arrival, settle in |
| Element disappears | `easeIn` | Slow departure, fast exit |
| Position change | `easeInOut` | Symmetric movement |
| Hover effects | `default` | Balanced feel |
| Scroll reveals | `default` | Natural entrance |
| Page transitions | `easeInOut` | Complete transform |
| Attention pulse | `easeInOut` | Smooth oscillation |
| Parallax | `linear` (exception) | Constant rate with scroll |

---

## 3. Variant Factory System

### 3.1 Available Factories

```typescript
// All factories are in src/lib/motion.ts

// Simple fade
createFadeVariants(duration?: SwissTimingKey = 'normal')
// Returns variants for opacity: 0 → 1

// Vertical slide with fade
createSlideUpVariants(distance?: number = 30, duration?: SwissTimingKey = 'normal')
// Returns variants for opacity + y: distance → 0

// Horizontal slide from left
createSlideInLeftVariants(distance?: number = 60, duration?: SwissTimingKey = 'slow')
// Returns variants for opacity + x: -distance → 0

// Parent container for stagger children
createStaggerContainerVariants(stagger?: SwissStaggerKey = 'normal')
// Returns parent variants with staggerChildren

// Letter-by-letter text reveal
createLetterVariants(baseDelay?: number = 0.8, perLetterDelay?: number = 0.05)
// Returns custom function variants for text animation

// Word-by-word with 3D rotation
createWordVariants()
// Returns variants with rotateX: -90 → 0
```

### 3.2 Factory Signatures & Returns

```typescript
// Fade Variants
createFadeVariants('normal');
// Returns:
{
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Slide Up Variants
createSlideUpVariants(32, 'slow');
// Returns:
{
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Stagger Container
createStaggerContainerVariants('dramatic');
// Returns:
{
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0
    }
  }
}

// Letter Variants (custom function)
createLetterVariants(0.8, 0.05);
// Returns:
{
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8 + i * 0.05,
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
}

// Word Variants (3D rotation)
createWordVariants();
// Returns:
{
  hidden: { 
    opacity: 0, 
    rotateX: -90,
    y: 20 
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}
```

### 3.3 Usage Patterns

```tsx
// Pattern 1: Simple scroll reveal
import { createSlideUpVariants, createStaggerContainerVariants } from '@/lib/motion';

const containerVariants = createStaggerContainerVariants('normal');
const itemVariants = createSlideUpVariants(32, 'normal');

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-96px' }}
  variants={containerVariants}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>

// Pattern 2: Letter-by-letter text
import { createLetterVariants } from '@/lib/motion';

const letterVariants = createLetterVariants(0.5, 0.03);
const letters = Array.from("Hello World");

<motion.h1>
  {letters.map((letter, i) => (
    <motion.span
      key={i}
      custom={i}
      initial="hidden"
      animate="visible"
      variants={letterVariants}
    >
      {letter === ' ' ? '\u00A0' : letter}
    </motion.span>
  ))}
</motion.h1>

// Pattern 3: Word-by-word manifesto
import { createWordVariants } from '@/lib/motion';

const wordVariants = createWordVariants();
const words = "We build with discipline.".split(' ');

<motion.p style={{ perspective: '1000px' }}>
  {words.map((word, i) => (
    <motion.span
      key={i}
      variants={wordVariants}
      className="inline-block mr-4"
    >
      {word}
    </motion.span>
  ))}
</motion.p>
```

---

## 4. Animation Patterns

### 4.1 Scroll-Triggered Reveals

```tsx
// Standard section reveal
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ 
    once: true,           // Only animate once
    margin: '-96px'       // Trigger 96px before visible (8px × 12)
  }}
  variants={containerVariants}
>
  {/* Content */}
</motion.section>

// Viewport margin follows Swiss grid:
// -48px  = 8px × 6  (close trigger)
// -96px  = 8px × 12 (standard trigger)
// -128px = 8px × 16 (early trigger)
```

### 4.2 Hover Interactions

```tsx
// Card hover lift (Swiss compliant)
<motion.div
  whileHover={{
    y: -8,  // 8px = base unit ✅
    transition: {
      duration: SWISS_TIMING.normal / 1000,
      ease: SWISS_EASING.default
    }
  }}
>
  <Card />
</motion.div>

// Button hover scale
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={SWISS_TRANSITIONS.micro}
>
  Click me
</motion.button>
```

### 4.3 Page Transitions

```tsx
// Layout animations with AnimatePresence
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: SWISS_TRANSITIONS.normal 
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: SWISS_TRANSITIONS.fast 
  }
};

<AnimatePresence mode="wait">
  <motion.div
    key={router.pathname}
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### 4.4 Loading States

```tsx
// Skeleton pulse
const pulseVariants = {
  initial: { opacity: 0.4 },
  animate: {
    opacity: [0.4, 0.7, 0.4],
    transition: {
      duration: 1.5,
      ease: SWISS_EASING.easeInOut,
      repeat: Infinity
    }
  }
};

// Spinner rotation
const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: 'linear', // Exception: spinners use linear
      repeat: Infinity
    }
  }
};
```

---

## 5. Accessibility

### 5.1 Reduced Motion Support

```typescript
// Static check (safe for SSR)
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Reactive hook (responds to preference changes)
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

// Usage in components
function AnimatedSection() {
  const prefersReduced = useReducedMotion();
  
  const variants = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } };
    
  return <motion.div variants={variants} />;
}
```

### 5.2 Accessible Variant Helper

```typescript
// Automatically simplifies animation for reduced motion
export function getAccessibleVariants<T extends object>(
  standardVariants: T,
  prefersReduced: boolean
): T | ReducedVariants {
  if (prefersReduced) {
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1, 
        transition: { duration: 0 } 
      },
    };
  }
  return standardVariants;
}

// Usage
const variants = getAccessibleVariants(
  createSlideUpVariants(32, 'normal'),
  prefersReducedMotion
);
```

### 5.3 Focus Visible Animations

```tsx
// Keyboard focus should still animate
// Even with reduced-motion preference
<motion.button
  whileFocus={{
    outline: '2px solid #2563eb',
    outlineOffset: '2px'
  }}
  transition={SWISS_TRANSITIONS.micro}
>
  Accessible Button
</motion.button>
```

---

## 6. Advanced Techniques

### 6.1 Orchestration Patterns

```tsx
// Sequential animation with controls
import { useAnimation } from 'framer-motion';

function OrchestratedSection() {
  const titleControls = useAnimation();
  const contentControls = useAnimation();
  
  async function playSequence() {
    await titleControls.start('visible');
    await contentControls.start('visible');
  }
  
  return (
    <>
      <motion.h1 animate={titleControls} variants={titleVariants}>
        Title
      </motion.h1>
      <motion.div animate={contentControls} variants={contentVariants}>
        Content
      </motion.div>
    </>
  );
}
```

### 6.2 Scroll-Linked Animations

```tsx
import { useScroll, useTransform, motion } from 'framer-motion';

function ParallaxImage() {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to Y position
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Transform scroll progress to opacity
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  
  return (
    <motion.img
      style={{ y, opacity }}
      src="/hero.jpg"
    />
  );
}
```

### 6.3 Gesture-Based Animations

```tsx
// Drag with constraints
<motion.div
  drag="x"
  dragConstraints={{ left: -100, right: 100 }}
  dragElastic={0.1}
  whileDrag={{ scale: 1.05 }}
/>

// Swipe-to-dismiss
const [isVisible, setIsVisible] = useState(true);

<AnimatePresence>
  {isVisible && (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) {
          setIsVisible(false);
        }
      }}
      exit={{ opacity: 0, x: info.offset.x > 0 ? 200 : -200 }}
    />
  )}
</AnimatePresence>
```

### 6.4 Layout Animations

```tsx
// Shared layout animations
import { LayoutGroup, motion } from 'framer-motion';

<LayoutGroup>
  {items.map((item) => (
    <motion.div
      key={item.id}
      layout
      layoutId={item.id}
      transition={SWISS_TRANSITIONS.normal}
    />
  ))}
</LayoutGroup>

// Automatic layout animation on state change
<motion.div
  layout
  className={isExpanded ? 'w-full' : 'w-64'}
/>
```

---

## Quick Reference Card

```
╔═══════════════════════════════════════════════════════════════╗
║                  ANIMATION CHEAT SHEET                        ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  EASING CURVES:                                               ║
║  ─────────────────                                            ║
║  default   │ [0.25, 0.46, 0.45, 0.94] │ General purpose       ║
║  easeOut   │ [0.22, 0.61, 0.36, 1]    │ Entrances             ║
║  easeIn    │ [0.55, 0.06, 0.68, 0.19] │ Exits                 ║
║  easeInOut │ [0.65, 0, 0.35, 1]       │ Position changes      ║
║                                                               ║
║  VARIANT FACTORIES:                                           ║
║  ─────────────────                                            ║
║  createFadeVariants(duration)                                 ║
║  createSlideUpVariants(distance, duration)                    ║
║  createSlideInLeftVariants(distance, duration)                ║
║  createStaggerContainerVariants(stagger)                      ║
║  createLetterVariants(baseDelay, perLetterDelay)              ║
║  createWordVariants()                                         ║
║                                                               ║
║  ACCESSIBILITY:                                               ║
║  ─────────────────                                            ║
║  useReducedMotion() │ Reactive hook for preference            ║
║  getAccessibleVariants() │ Auto-simplify when needed          ║
║                                                               ║
║  VIEWPORT MARGINS (Swiss Grid):                               ║
║  ─────────────────                                            ║
║  -48px  = 8 × 6  │ Close trigger                              ║
║  -96px  = 8 × 12 │ Standard trigger                           ║
║  -128px = 8 × 16 │ Early trigger                              ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

*This guide covers animation patterns and easing curves. For duration values, see [TIMING-SPECIFIC-GUIDE.md](./TIMING-SPECIFIC-GUIDE.md).*
