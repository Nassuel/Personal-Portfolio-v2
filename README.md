# Nassuel's Homepage

Live at [nassuel.com](https://www.nassuel.com/)

## Stack

- [Next.js 16](https://nextjs.org/) - React framework with hybrid static & server rendering and route pre-fetching
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed JavaScript
- [Chakra UI v3](https://chakra-ui.com/) - Modular and accessible component library for React
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [Three.js](https://threejs.org/) - 3D graphics library (interactive car model on the home page)
- [next-themes](https://github.com/pacocoursey/next-themes) - Light/dark mode support
- [Vercel Analytics](https://vercel.com/analytics) - Web analytics

## Requirements

- Node.js `24.x`

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command              | Description                       |
|----------------------|-----------------------------------|
| `npm run dev`        | Start the development server      |
| `npm run build`      | Build the app for production      |
| `npm run start`      | Start the production server       |
| `npm run lint`       | Run ESLint                        |
| `npm run prettier`   | Format all files with Prettier    |

## Project Structure

```
$PROJECT_ROOT
├── pages/                    # Next.js page routes
│   ├── _app.tsx              # App wrapper (providers, layout, analytics)
│   ├── _document.tsx         # Custom HTML document
│   ├── index.tsx             # Home page (bio, volunteering, social links)
│   ├── about.tsx             # About page (experience, education, certifications)
│   ├── freelancing.tsx       # Freelancing projects
│   ├── personal-projects.tsx # Academic and personal projects
│   └── 404.tsx               # Not found page
├── components/               # React components
│   ├── layouts/              # Page layout wrappers (main, article)
│   ├── icons/                # Custom SVG icon components
│   └── ...                   # UI components (navbar, logo, footer, etc.)
├── lib/                      # Non-React modules
│   ├── data.ts               # Typed content data (experiences, education, etc.)
│   ├── theme.ts              # Chakra UI theme configuration
│   └── model.ts              # Three.js GLTF model loader
└── public/                   # Static assets
    ├── images/               # Project thumbnails
    ├── icons/                # Company and brand icons
    └── *.glb                 # 3D model files
```

## License

MIT License.

## Credits

Scaffolding by [Takuya Matsuyama](https://www.craftz.dog/).
