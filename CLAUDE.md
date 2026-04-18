# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Start dev server on 0.0.0.0:3000
yarn build        # Production build
yarn start        # Start production server
yarn lint         # Run ESLint
yarn prettier     # Format all files with Prettier
```

No test suite is configured. Node.js 24.x is required.

## Architecture

This is a **Next.js portfolio site using the Pages Router** (not App Router). All content is static — no API routes, no server-side data fetching.

### Routing & Pages

Pages live in `pages/` and map directly to routes:
- `_app.tsx` — global provider stack: Chakra → Custom Fonts → Framer `AnimatePresence` → Main Layout → Page
- `_document.tsx` — HTML document shell
- `index.tsx` — home/bio
- `about.tsx` — experience, education, certifications
- `freelancing.tsx` — freelancing projects
- `personal-projects.tsx` — academic/personal work

### Layout System

- `components/layouts/main.tsx` — wraps every page; handles NavBar, Footer, and `<Head>` metadata
- `components/layouts/article.tsx` — secondary wrapper for content pages

### Content

All site content is typed constants in `lib/data.ts` — experiences, education, certifications, skills, and social links. To update content, edit that file directly.

### Theming

Chakra UI v3 with a custom system defined in `lib/theme.ts`:
- Light mode: bisque (`#ffe4c4`) background, peru (`#cd853f`) accents
- Dark mode: saddle brown (`#8b4513`) background, lime green (`#32cd32`) accents
- Heading font: "Tinos"
- Dark/light toggling via `next-themes`

### 3D Component

`components/VoxelDog` renders a `.glb` model using Three.js. The model loader lives in `lib/model.ts`. This is the most complex component in the repo.

### Key Conventions

- **Path alias:** `@/*` maps to the repo root
- **Unused vars:** ESLint allows unused variables prefixed with `_`
- **Page transitions:** Framer Motion `AnimatePresence` with `mode="wait"` handles page enter/exit; scroll resets to top on navigation via manual scroll restoration in `_app.tsx`
- **Links:** Next.js `Link` wrapped in Chakra `Link`; use the `link.color` token for theme-aware link styling
- **Icons:** `react-icons` (IoLogo* for social, Md* for email, etc.)