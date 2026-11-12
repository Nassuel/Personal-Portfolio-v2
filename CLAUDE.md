# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev             # Start dev server on 0.0.0.0:3000
npm run build           # Production build
npm start               # Start production server
npm test                # Run the Vitest suite once
npm run coverage        # Run the suite with V8 coverage; fails below 100%
npm run lint            # Lint with ESLint (flat config in eslint.config.mjs)
npm run prettier        # Format all files with Prettier
npm run optimize-model  # Rebuild a web-ready .glb from a Sketchfab export (see below)
```

Use npm; `package-lock.json` is the lockfile. Node.js 24.x is required. ESLint stays on 9.x until `eslint-config-next`'s React, import and jsx-a11y plugins support ESLint 10.

## Architecture

This is a **Next.js portfolio site using the Pages Router** (not App Router). All content is static: no API routes, no server-side data fetching.

### Routing & Pages

Pages live in `pages/` and map directly to routes:
- `_app.tsx`: global stack. `ThemeProvider` → font CSS variables (`<style jsx global>`) → Main Layout → Framer `AnimatePresence` → Page, plus Vercel Analytics. Imports `styles/globals.css`.
- `_document.tsx`: HTML document shell
- `index.tsx`: home almanac (hero, 3D car figure, bio, volunteering, links)
- `about.tsx`: experience, education, certifications
- `freelancing.tsx`: client work
- `personal-projects.tsx`: academic and personal work
- `tools/index.tsx`, `tools/chord-converter.tsx`: small utilities

Never put tests or other non-page modules in `pages/`; every file there becomes a route.

### Layout System

- `components/layouts/main.tsx`: wraps every page; NavBar, Footer, and default `<Head>` metadata
- `components/layouts/article.tsx`: page transition wrapper; sets `<title>` when given a `title`
- `components/editorial/*`: the almanac vocabulary (section marks, titles, page headers, ornaments, tags)

### Content

- `lib/data.ts`: experiences, education, certifications, skills, socials
- `lib/home/*`: home timeline entries and social links
- `lib/projects/data.ts`: project cards; `lib/projects/catalog.ts` groups them and decides which links are safe
- `lib/tools/data.ts`: tools listed on `/tools`
- `lib/navigation.ts`: nav bar and mobile menu entries

### Theming

Tailwind CSS v4 with shadcn/ui (base-nova style on Base UI). Tokens live in `styles/globals.css`:
- Light mode: bisque (`#ffe4c4`) paper, dark-brown ink, burnt-sienna accent (`#8f4a1f`)
- Dark mode: espresso (`#1f1209`) paper, cream ink, lime accent (`#32cd32`), scanlines
- Fonts (via `next/font`, set as CSS variables in `lib/fonts.ts`): Fraunces headings, Newsreader body, JetBrains Mono labels, Babylonica script
- Dark/light toggling via `next-themes` with the `class` attribute; dark is the default
- shadcn components live in `components/ui/`; add more with the shadcn CLI. Base UI uses a `render` prop instead of `asChild`.

### 3D Model Viewer

The home page shows the Koenigsegg One:1 (`public/koenigsegg-one.glb`) in `components/home/car-figure.tsx`:
- `components/model-viewer.tsx`: React shell. Shows a poster image until the model loads; keeps the poster when WebGL is missing or loading fails.
- `lib/model-viewer/stage.ts`: `ModelStage` owns the scene, turntable orbit controls, render loop and cleanup.
- `lib/model-viewer/framing.ts`: fits the camera so the model never clips at any orbit angle.
- `lib/model-viewer/adapters.ts`: the WebGL-specific pieces (renderer, light probe, GLTF loader with meshopt).

The `.glb` is built from the original Sketchfab export, which is too large to serve:

```bash
npm run optimize-model -- original.glb public/koenigsegg-one.glb --ratio 0.12 \
  --drop-material studio_materal --paint "base_paint=#007BA7"
```

After changing the model, regenerate `public/images/home/koenigsegg-poster.png` from a real render at the rest pose so the poster and live view line up. The model is CC BY 4.0; keep the attribution in the figure caption.

### Testing

Vitest + jsdom + Testing Library. Tests live in `tests/`, mirroring the source tree. `npm run coverage` enforces 100% statements, branches, functions and lines over `components/`, `lib/` and `pages/`.
- Write tests from the spec in each function's doc comment, not from the implementation.
- `tests/setup.ts` mocks `next/font/google` and `next/head`, and stubs `matchMedia`, `ResizeObserver` and `IntersectionObserver`.
- `vitest.config.mts` turns image imports into `StaticImageData` so `next/image` works.

### Key Conventions

- **Path alias:** `@/*` maps to the repo root
- **Page transitions:** Framer Motion `AnimatePresence` with `mode="wait"`; scroll resets to top on navigation via manual scroll restoration in `_app.tsx`
- **Links:** `components/text-link.tsx` for inline links and `components/link-card.tsx` for whole-card links. Both keep internal routes in the app and open external sites in a new tab with `rel="noopener noreferrer"`.
- **Icons:** `react-icons` (IoLogo* for social, Md* for email) and `lucide-react` inside shadcn components
