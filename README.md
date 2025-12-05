## Crafted Portfolio Web

- Purpose: Next.js 15 + TypeScript + Tailwind starter for a portfolio site.
- Location: `crafted-portfolio-web/`

### Scripts
- `npm run dev`: Start local dev server on `http://localhost:3000`
- `npm run build`: Build production assets
- `npm start`: Run production build

### Quick Start
```bash
cd crafted-portfolio-web
npm install
npm run dev
```

### Structure
- `src/app/page.tsx`: Homepage
- `src/app/layout.tsx`: Root layout
- `tailwind.config.ts`: Tailwind configuration
- `postcss.config.mjs`: Tailwind/PostCSS setup
 - `src/app/personas/*`: Persona demo apps

### Notes
- App Router is enabled with the `src` directory.
- ESLint is configured via `eslint-config-next`.
 - Demo lead‑gen forms submit to Formspree placeholders; replace action URLs.
 - Mock auth: client-side `AuthProvider` in `src/app/components/AuthProvider.tsx` with roles.
 - In-memory data: each persona page uses `useState` to simulate CRUD/queues/carts.
# crafted-portfolio