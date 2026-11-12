// Shrinks a Sketchfab glTF export for the web:
//   node scripts/optimize-model.mjs <input.glb> <output.glb> [--ratio 0.12]
//       [--drop-material name]... [--paint material=#rrggbb]...
// Drops the studio backdrop, repaints materials, welds and simplifies the meshes, quantizes vertex
// data and applies EXT_meshopt_compression, which three.js decodes with the
// MeshoptDecoder bundled in three/addons (no external decoder download).
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import {
    dedup,
    meshopt,
    prune,
    quantize,
    simplify,
    weld
} from "@gltf-transform/functions";
import { MeshoptEncoder, MeshoptSimplifier } from "meshoptimizer";

const [input, output, ...flags] = process.argv.slice(2);
if (!input || !output) {
    console.error(
        "usage: node scripts/optimize-model.mjs <input.glb> <output.glb> [--ratio 0.12] [--drop-material name]... [--paint material=#rrggbb]..."
    );
    process.exit(1);
}

const flagValues = name =>
    flags.flatMap((flag, i) => (flag === name ? [flags[i + 1]] : []));
const ratio = Number(flagValues("--ratio")[0] ?? 0.12);
const droppedMaterials = new Set(flagValues("--drop-material"));
const paints = new Map(
    flagValues("--paint").map(entry => {
        const [material, hex] = entry.split("=");
        return [material, hex];
    })
);

/* glTF base colors are linear; CSS hex colors are sRGB. */
const srgbToLinear = channel =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
const linearColor = hex => {
    const match = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
    if (!match) throw new Error(`--paint expects #rrggbb, got "${hex}"`);
    return match.slice(1).map(pair => srgbToLinear(parseInt(pair, 16) / 255));
};

await MeshoptEncoder.ready;
await MeshoptSimplifier.ready;

const io = new NodeIO()
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies({ "meshopt.encoder": MeshoptEncoder });
const document = await io.read(input);

for (const node of document.getRoot().listNodes()) {
    const mesh = node.getMesh();
    const usesDropped = mesh
        ?.listPrimitives()
        .some(primitive =>
            droppedMaterials.has(primitive.getMaterial()?.getName() ?? "")
        );
    if (usesDropped) node.dispose();
}

for (const [name, hex] of paints) {
    const material = document
        .getRoot()
        .listMaterials()
        .find(candidate => candidate.getName() === name);
    if (!material) throw new Error(`--paint: no material named "${name}"`);
    const alpha = material.getBaseColorFactor()[3];
    material.setBaseColorFactor([...linearColor(hex), alpha]);
}

await document.transform(
    dedup(),
    prune(),
    weld(),
    simplify({ simplifier: MeshoptSimplifier, ratio, error: 0.001 }),
    prune(),
    quantize(),
    meshopt({ encoder: MeshoptEncoder, level: "medium" })
);

await io.write(output, document);
console.log(
    `wrote ${output} (ratio ${ratio}, dropped: ${[...droppedMaterials].join(", ") || "none"}, painted: ${[...paints].map(([m, h]) => `${m}=${h}`).join(", ") || "none"})`
);
