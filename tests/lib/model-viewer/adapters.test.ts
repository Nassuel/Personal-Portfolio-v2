import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { describe, expect, it, vi } from "vitest";
import { webglAdapters } from "@/lib/model-viewer/adapters";

const pmrem = vi.hoisted(() => ({
    fromScene: vi.fn(),
    dispose: vi.fn()
}));

/* jsdom has no WebGL, so the GPU-backed classes are replaced at the three.js boundary. */
vi.mock("three", async importOriginal => {
    const actual = await importOriginal<typeof import("three")>();
    class FakeWebGLRenderer {
        outputColorSpace = "";
        toneMapping = 0;
        toneMappingExposure = 0;
        constructor(readonly parameters: object) {}
    }
    class FakePMREMGenerator {
        fromScene = pmrem.fromScene;
        dispose = pmrem.dispose;
    }
    return {
        ...actual,
        WebGLRenderer: FakeWebGLRenderer,
        PMREMGenerator: FakePMREMGenerator
    };
});

describe("webglAdapters.createRenderer", () => {
    it("makes a transparent, antialiased renderer with sRGB output and filmic tone mapping", () => {
        const renderer = webglAdapters.createRenderer() as unknown as {
            parameters: object;
            outputColorSpace: string;
            toneMapping: number;
            toneMappingExposure: number;
        };
        expect(renderer.parameters).toEqual({ antialias: true, alpha: true });
        expect(renderer.outputColorSpace).toBe(SRGBColorSpace);
        expect(renderer.toneMapping).toBe(ACESFilmicToneMapping);
        expect(renderer.toneMappingExposure).toBe(1);
    });
});

describe("webglAdapters.createEnvironment", () => {
    it("bakes a room light probe and frees the generator", () => {
        const texture = { isTexture: true };
        pmrem.fromScene.mockReturnValue({ texture });
        const environment = webglAdapters.createEnvironment(
            webglAdapters.createRenderer()
        );
        expect(environment).toBe(texture);
        expect(pmrem.fromScene).toHaveBeenCalledWith(
            expect.objectContaining({ isScene: true }),
            0.04
        );
        expect(pmrem.dispose).toHaveBeenCalledOnce();
    });
});

describe("webglAdapters.loadModel", () => {
    it("loads a glTF file and returns its scene", async () => {
        const gltf = {
            asset: { version: "2.0" },
            scene: 0,
            scenes: [{ nodes: [0] }],
            nodes: [{ name: "car-body" }]
        };
        const url = `data:model/gltf+json;base64,${btoa(JSON.stringify(gltf))}`;
        const scene = await webglAdapters.loadModel(url);
        expect(scene.getObjectByName("car-body")).toBeDefined();
    });

    it("rejects when the file is not a model", async () => {
        const url = `data:model/gltf+json;base64,${btoa("not json")}`;
        await expect(webglAdapters.loadModel(url)).rejects.toThrow();
    });
});
