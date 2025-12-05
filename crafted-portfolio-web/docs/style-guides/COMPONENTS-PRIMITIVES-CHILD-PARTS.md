# 🧱 COMPONENTS-PRIMITIVES-CHILD-PARTS GUIDE
## Atomic Design Component Architecture

> *"Components are not just code—they're contracts. Every prop, every variant, every child is an intentional decision."*

---

## Table of Contents

1. [Atomic Design Philosophy](#1-atomic-design-philosophy)
2. [Primitive Components (Atoms)](#2-primitive-components-atoms)
3. [Compound Components (Molecules)](#3-compound-components-molecules)
4. [Section Components (Organisms)](#4-section-components-organisms)
5. [Swiss Components](#5-swiss-components)
6. [Composition Patterns](#6-composition-patterns)
7. [Component Contracts](#7-component-contracts)

---

## 1. Atomic Design Philosophy

### 1.1 The Atomic Model

```
┌─────────────────────────────────────────────────────────────┐
│                    ATOMIC DESIGN LAYERS                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ATOMS (Primitives)                                         │
│  ─────────────────                                          │
│  The smallest, indivisible UI elements.                     │
│  Cannot be broken down further.                             │
│  └── Button, Badge, Input, Avatar, Separator, Progress      │
│                                                              │
│  MOLECULES (Simple Compounds)                               │
│  ─────────────────                                          │
│  Groups of atoms functioning as a unit.                     │
│  Have a single, clear purpose.                              │
│  └── Card, FormField, SwissServiceCard                      │
│                                                              │
│  ORGANISMS (Complex Compounds)                              │
│  ─────────────────                                          │
│  Larger components made of molecules and atoms.             │
│  Can function independently.                                │
│  └── Header, ContactForm, ServiceGrid                       │
│                                                              │
│  TEMPLATES (Page Sections)                                  │
│  ─────────────────                                          │
│  Full page sections with layout.                            │
│  Define content structure.                                  │
│  └── Hero, AboutUsSwiss, CaseStudies, ContactCTA            │
│                                                              │
│  PAGES (Full Compositions)                                  │
│  ─────────────────                                          │
│  Complete pages with real content.                          │
│  └── Homepage, About, Blog, PersonaDetail                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Component Location Map

```
src/components/
├── ui/                          # Primitives & Molecules
│   ├── Button.tsx               # Atom
│   ├── Badge.tsx                # Atom
│   ├── Input.tsx                # Atom
│   ├── Textarea.tsx             # Atom
│   ├── Avatar.tsx               # Atom
│   ├── Progress.tsx             # Atom
│   ├── Separator.tsx            # Atom
│   ├── Card.tsx                 # Molecule (compound parts)
│   ├── Container.tsx            # Layout Atom
│   ├── Section.tsx              # Layout Molecule
│   ├── Grid.tsx                 # Layout Atom
│   ├── AngleDivider.tsx         # Decorative Atom
│   └── swiss/                   # Swiss Design System
│       ├── SwissServiceCard.tsx # Molecule
│       └── index.ts             # Barrel export
├── sections/                    # Templates (Organisms)
│   ├── Hero.tsx
│   ├── AboutUs.tsx
│   ├── AboutUsSwiss.tsx
│   ├── WhyUs.tsx
│   ├── CaseStudies.tsx
│   ├── TechStack.tsx
│   └── ContactCTA.tsx
├── layout/                      # Structural Components
│   ├── StickyHeader.tsx
│   └── Footer.tsx (in layout.tsx)
└── features/                    # Feature-specific
    ├── AIAssistant.tsx
    └── HeroScene.tsx
```

---

## 2. Primitive Components (Atoms)

### 2.1 Button

**File:** `src/components/ui/Button.tsx`

```typescript
interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;  // Render as child element (Radix pattern)
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

**Variants:**

| Variant | Classes | Use Case |
|---------|---------|----------|
| `default` | `bg-gray-900 text-white hover:bg-gray-800` | Primary actions |
| `outline` | `border border-gray-300 bg-white hover:bg-gray-50` | Secondary actions |
| `ghost` | `hover:bg-gray-100` | Tertiary/icon buttons |
| `destructive` | `bg-red-600 text-white hover:bg-red-700` | Delete/cancel |

**Sizes:**

| Size | Classes | Dimensions |
|------|---------|------------|
| `sm` | `h-9 px-3` | 36px height |
| `default` | `h-10 px-4 py-2` | 40px height |
| `lg` | `h-11 px-8` | 44px height |
| `icon` | `h-10 w-10` | 40×40px square |

**Swiss Compliance:**
- ✅ Heights are 8px multiples (36, 40, 44)
- ⚠️ `px-3` (12px) in `sm` is NOT 8px compliant → Should be `px-4`

---

### 2.2 Badge

**File:** `src/components/ui/Badge.tsx`

```typescript
interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
  className?: string;
  children: React.ReactNode;
}
```

**Variants:**

| Variant | Classes |
|---------|---------|
| `default` | `bg-gray-900 text-gray-50` |
| `secondary` | `bg-gray-100 text-gray-900` |
| `destructive` | `bg-red-500 text-gray-50` |
| `outline` | `text-gray-950 border border-gray-200` |
| `success` | `bg-green-500 text-gray-50` |

**Base Classes:**
```
rounded-full px-2.5 py-0.5 text-xs font-semibold
```

**Swiss Compliance:**
- ⚠️ `px-2.5` (10px) is NOT 8px compliant → Should be `px-2` (8px) or `px-3` (12px)
- ⚠️ `py-0.5` (2px) is NOT 8px compliant

---

### 2.3 Input

**File:** `src/components/ui/Input.tsx`

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
```

**Base Classes:**
```
flex h-10 w-full rounded-md border border-gray-200 bg-white 
px-3 py-2 text-sm ring-offset-white 
file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-gray-500 
focus-visible:outline-none focus-visible:ring-2 
focus-visible:ring-gray-950 focus-visible:ring-offset-2 
disabled:cursor-not-allowed disabled:opacity-50
```

**Swiss Compliance:**
- ✅ `h-10` (40px) = 8px × 5
- ⚠️ `px-3` (12px) NOT compliant
- ⚠️ `py-2` (8px) ✅ compliant

---

### 2.4 Avatar

**File:** `src/components/ui/Avatar.tsx`

**Compound Structure:**
```typescript
// Root wrapper
<Avatar>
  // Image (optional)
  <AvatarImage src="..." alt="..." />
  // Fallback when no image
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
```

**Classes:**
```
Avatar:         relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full
AvatarImage:    aspect-square h-full w-full
AvatarFallback: flex h-full w-full items-center justify-center 
                rounded-full bg-gray-100 text-sm font-medium text-gray-600
```

---

### 2.5 Progress

**File:** `src/components/ui/Progress.tsx`

```typescript
interface ProgressProps {
  value?: number;      // 0-100
  className?: string;
}
```

**Structure:**
```typescript
<Progress value={60}>
  // Root (track)
  // Indicator (fill)
</Progress>
```

**Classes:**
```
Root:      relative h-2 w-full overflow-hidden rounded-full bg-gray-100
Indicator: h-full bg-gray-900 transition-all
```

---

### 2.6 Separator

**File:** `src/components/ui/Separator.tsx`

```typescript
interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  className?: string;
}
```

**Classes:**
```
Base:       shrink-0 bg-gray-200
Horizontal: h-[1px] w-full
Vertical:   h-full w-[1px]
```

---

## 3. Compound Components (Molecules)

### 3.1 Card

**File:** `src/components/ui/Card.tsx`

**Compound Structure:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

**Part Classes:**

| Part | Classes |
|------|---------|
| `Card` | `rounded-lg border bg-white text-gray-950 shadow-sm` |
| `CardHeader` | `flex flex-col space-y-1.5 p-6` |
| `CardTitle` | `text-2xl font-semibold leading-none tracking-tight` |
| `CardDescription` | `text-sm text-gray-500` |
| `CardContent` | `p-6 pt-0` |
| `CardFooter` | `flex items-center p-6 pt-0` |

**Swiss Compliance:**
- ✅ `p-6` (24px) = 8px × 3
- ⚠️ `space-y-1.5` (6px) NOT compliant → Should be `space-y-2` (8px)

---

### 3.2 Section

**File:** `src/components/ui/Section.tsx`

**Structure:**
```tsx
<Section id="about" className="bg-white">
  <Container>
    {/* Section content */}
  </Container>
</Section>
```

**Props:**
```typescript
interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}
```

**Default Classes:**
- Section: `py-16 lg:py-24` (64/96px) ✅ Swiss compliant
- Container: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`

---

### 3.3 Container

**File:** `src/components/ui/Container.tsx`

```typescript
interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}
```

**Default Classes:**
```
mx-auto max-w-7xl px-4 sm:px-6 lg:px-8
```

**Width: 1280px max (80rem)**

---

### 3.4 Grid

**File:** `src/components/ui/Grid.tsx`

```typescript
interface GridProps {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 2 | 4 | 6 | 8;
  className?: string;
  children: React.ReactNode;
}
```

**Column Mappings:**
```typescript
const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
  6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
};

const gapMap = {
  2: 'gap-2',   // 8px  ✅
  4: 'gap-4',   // 16px ✅
  6: 'gap-6',   // 24px ✅
  8: 'gap-8',   // 32px ✅
};
```

---

## 4. Section Components (Organisms)

### 4.1 Common Section Pattern

All section components follow this structure:

```tsx
export function SectionName() {
  return (
    <Section id="section-id" className="bg-[color]">
      <Container>
        {/* Section header */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Section Title
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Section description
          </p>
        </div>
        
        {/* Section content */}
        <Grid cols={2} gap={6}>
          {/* Grid items */}
        </Grid>
      </Container>
    </Section>
  );
}
```

### 4.2 Section Inventory

| Section | Background | Grid | Animation |
|---------|------------|------|-----------|
| Hero | `gray-950` | None (flex) | Framer stagger |
| AboutUsSwiss | `white` | 2-col cards | Swiss motion |
| WhyUs | `white` | 2-col | None |
| CaseStudies | `gray-50` | 3-col | CSS hover |
| TechStack | `white` | 4-col | CSS hover |
| ContactCTA | Gradient | 2-col | None |

---

## 5. Swiss Components

### 5.1 SwissServiceCard

**File:** `src/components/ui/swiss/SwissServiceCard.tsx`

```typescript
interface SwissServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  primaryLink: string;
  primaryText: string;
  secondaryLink: string;
  secondaryText: string;
  index?: number;
  testId?: string;
}
```

**Swiss Grid Compliance (All ✅):**

| Property | Value | Swiss Multiple |
|----------|-------|----------------|
| Card padding | `p-12` (48px) | 8 × 6 |
| Icon margin | `mb-8` (32px) | 8 × 4 |
| Title margin | `mb-6` (24px) | 8 × 3 |
| Description margin | `mb-8` (32px) | 8 × 4 |
| Button stack | `space-y-4` (16px) | 8 × 2 |
| Button padding Y | `py-4` (16px) | 8 × 2 |
| Hover lift | `y: -8` (8px) | 8 × 1 |
| Icon padding | `p-6` (24px) | 8 × 3 |

**Animation:**
- Hover: `y: -8` with `SWISS_TIMING.normal` (300ms)
- Background pattern fade: `SWISS_TIMING.slow` (500ms)
- Icon color transition: `SWISS_TIMING.slow` (500ms)

---

### 5.2 Future Swiss Components (Planned)

```
src/components/ui/swiss/
├── SwissServiceCard.tsx      ✅ Complete
├── SwissButton.tsx           📋 Planned
├── SwissCard.tsx             📋 Planned
├── SwissInput.tsx            📋 Planned
├── SwissBadge.tsx            📋 Planned
├── SwissSection.tsx          📋 Planned
└── index.ts                  ✅ Complete
```

---

## 6. Composition Patterns

### 6.1 The cn() Utility

All components use the `cn()` utility for class merging:

```typescript
import { cn } from '@/lib/utils';

// Combines classes intelligently
cn(
  'base-classes',
  variant === 'primary' && 'primary-classes',
  className  // User overrides
);

// Handles conflicts
cn('text-red-500', 'text-blue-500')
// Result: 'text-blue-500' (last wins)
```

### 6.2 Variant Pattern (CVA)

For components with multiple variants, use class-variance-authority:

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base classes
  'inline-flex items-center justify-center rounded-md font-medium',
  {
    variants: {
      variant: {
        default: 'bg-gray-900 text-white hover:bg-gray-800',
        outline: 'border border-gray-300 hover:bg-gray-50',
      },
      size: {
        sm: 'h-9 px-3',
        default: 'h-10 px-4 py-2',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants>;
```

### 6.3 asChild Pattern

For polymorphic components that can render as different elements:

```tsx
import { Slot } from '@radix-ui/react-slot';

interface ButtonProps {
  asChild?: boolean;
  children: React.ReactNode;
}

function Button({ asChild, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props}>{children}</Comp>;
}

// Usage
<Button asChild>
  <Link href="/about">About</Link>
</Button>
// Renders as <a> with Button styles
```

### 6.4 Compound Component Pattern

For components with multiple related parts:

```tsx
// Create context
const CardContext = createContext<{ variant?: string }>({});

// Root component
function Card({ variant, children }) {
  return (
    <CardContext.Provider value={{ variant }}>
      <div className={cn('card-base', variantClasses[variant])}>
        {children}
      </div>
    </CardContext.Provider>
  );
}

// Child components
function CardHeader({ children }) {
  const { variant } = useContext(CardContext);
  return <div className="card-header">{children}</div>;
}

// Attach children to parent
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

// Usage
<Card variant="elevated">
  <Card.Header>Title</Card.Header>
  <Card.Content>Content</Card.Content>
</Card>
```

---

## 7. Component Contracts

### 7.1 Required Props Standards

```typescript
// Every interactive component must have:
interface InteractiveProps {
  disabled?: boolean;         // Disable interactions
  className?: string;         // Allow style overrides
  'data-testid'?: string;     // Testing hook
}

// Every form component must have:
interface FormComponentProps {
  id?: string;                // Label association
  name?: string;              // Form submission
  required?: boolean;         // Validation
  'aria-describedby'?: string; // Accessibility
}
```

### 7.2 Accessibility Contracts

```typescript
// Every button must support:
- role="button" (automatic for <button>)
- disabled state (visual + aria-disabled)
- focus-visible styles
- keyboard interaction (Enter/Space)

// Every form input must support:
- aria-label or associated <label>
- aria-invalid for errors
- aria-describedby for help text
- focus-visible ring
```

### 7.3 Swiss Design Contracts

```typescript
// Every Swiss component must:
- Use only 8px-multiple spacing
- Use SWISS_TIMING for animations
- Use SWISS_EASING for curves
- Support useReducedMotion()
- Include JSDoc with Swiss grid compliance notes
```

---

## Quick Reference Card

```
╔═══════════════════════════════════════════════════════════════╗
║                  COMPONENT CHEAT SHEET                        ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ATOMIC LEVELS:                                               ║
║  ─────────────────                                            ║
║  Atoms     │ Button, Badge, Input, Avatar, Progress           ║
║  Molecules │ Card, Section, SwissServiceCard                  ║
║  Organisms │ Hero, AboutUsSwiss, ContactCTA                   ║
║  Pages     │ Homepage, About, Blog                            ║
║                                                               ║
║  UTILITIES:                                                   ║
║  ─────────────────                                            ║
║  cn()      │ Class merging with conflict resolution           ║
║  cva()     │ Variant definitions                              ║
║  Slot      │ asChild polymorphic pattern                      ║
║                                                               ║
║  SWISS COMPONENTS:                                            ║
║  ─────────────────                                            ║
║  SwissServiceCard │ p-12, mb-8, mb-6, space-y-4               ║
║  (All use 8px grid multiples)                                 ║
║                                                               ║
║  SWISS COMPLIANCE ISSUES TO FIX:                              ║
║  ─────────────────                                            ║
║  Button sm     │ px-3 (12px) → px-4 (16px)                    ║
║  Badge         │ px-2.5 (10px) → px-2 or px-3                 ║
║  Card          │ space-y-1.5 (6px) → space-y-2                ║
║  Input         │ px-3 (12px) → px-4 (16px)                    ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

*This guide documents component structure and composition patterns. For styling details, see [COLOR-STYLE-ACCENT-UI-UX.md](./COLOR-STYLE-ACCENT-UI-UX.md).*
