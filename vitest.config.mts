import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

/**
 * Next turns `import x from "./photo.png"` into StaticImageData at build time.
 * Vite would hand back a bare URL, which next/image rejects with placeholder="blur".
 */
const staticImageData = (): Plugin => ({
    name: "static-image-data",
    enforce: "pre",
    load(id) {
        if (!/\.(png|jpe?g|webp|gif|avif)$/.test(id)) return null;
        const src = `/${path.relative(root, id).replaceAll("\\", "/")}`;
        const image = {
            src,
            width: 1600,
            height: 800,
            blurDataURL: "data:image/png;base64,iVBORw0KGgo="
        };
        return `export default ${JSON.stringify(image)};`;
    }
});

export default defineConfig({
    plugins: [react(), staticImageData()],
    resolve: { alias: { "@": root } },
    test: {
        environment: "jsdom",
        setupFiles: ["./tests/setup.ts"],
        include: ["tests/**/*.test.{ts,tsx}"],
        coverage: {
            provider: "v8",
            include: [
                "components/**/*.{ts,tsx}",
                "lib/**/*.ts",
                "pages/**/*.tsx"
            ],
            reporter: ["text", "html"],
            thresholds: { 100: true }
        }
    }
});
