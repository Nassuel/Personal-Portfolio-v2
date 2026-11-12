import { act, render, screen } from "@testing-library/react";
import type { Object3D, Texture, WebGLRenderer } from "three";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ModelViewer from "@/components/model-viewer";
import type { ViewerAdapters } from "@/lib/model-viewer/adapters";
import type { StageOptions } from "@/lib/model-viewer/stage";

const stages = vi.hoisted(() => [] as FakeStageShape[]);
interface FakeStageShape {
    container: HTMLElement;
    options: StageOptions;
    show: ReturnType<typeof vi.fn>;
    resize: ReturnType<typeof vi.fn>;
    setActive: ReturnType<typeof vi.fn>;
    dispose: ReturnType<typeof vi.fn>;
}

vi.mock("@/lib/model-viewer/stage", async () => {
    const { vi } = await import("vitest");
    class FakeStage {
        show = vi.fn();
        resize = vi.fn();
        setActive = vi.fn();
        dispose = vi.fn();
        constructor(
            readonly container: HTMLElement,
            readonly options: StageOptions
        ) {
            stages.push(this);
        }
    }
    return { ModelStage: FakeStage };
});

const poster = {
    src: "/poster.png",
    width: 1600,
    height: 800,
    blurDataURL: "data:image/png;base64,AA=="
};
const environment = { isTexture: true } as unknown as Texture;
const renderer = {
    domElement: document.createElement("canvas")
} as unknown as WebGLRenderer;
const model = { name: "car" } as Object3D;

function deferred<T>() {
    let resolve!: (value: T) => void;
    let reject!: (reason: unknown) => void;
    const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, resolve, reject };
}

function adapters(overrides: Partial<ViewerAdapters> = {}): ViewerAdapters {
    return {
        createRenderer: () => renderer,
        createEnvironment: () => environment,
        loadModel: () => new Promise(() => {}),
        ...overrides
    };
}

const observers: {
    resize?: ResizeObserverCallback;
    visibility?: IntersectionObserverCallback;
} = {};
const disconnects = { resize: vi.fn(), visibility: vi.fn() };

beforeEach(() => {
    stages.length = 0;
    vi.stubGlobal(
        "ResizeObserver",
        class {
            constructor(callback: ResizeObserverCallback) {
                observers.resize = callback;
            }
            observe() {}
            disconnect = disconnects.resize;
        }
    );
    vi.stubGlobal(
        "IntersectionObserver",
        class {
            constructor(callback: IntersectionObserverCallback) {
                observers.visibility = callback;
            }
            observe() {}
            disconnect = disconnects.visibility;
        }
    );
});

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

const view = (adapterSet: ViewerAdapters) =>
    render(
        <ModelViewer
            src="/car.glb"
            poster={poster}
            alt="A car"
            adapters={adapterSet}
        />
    );

describe("ModelViewer", () => {
    it("shows the poster and a loading note while the model loads", () => {
        const { container } = view(adapters());
        expect(screen.getByRole("img", { name: "A car" })).toBeVisible();
        expect(screen.getByRole("status")).toHaveTextContent(
            "Loading 3D model…"
        );
        expect(container.firstChild).toHaveAttribute("data-status", "loading");
    });

    it("keeps only the poster when WebGL is unavailable", () => {
        const { container } = view(
            adapters({
                createRenderer: () => {
                    throw new Error("no WebGL");
                }
            })
        );
        expect(container.firstChild).toHaveAttribute(
            "data-status",
            "unavailable"
        );
        expect(screen.queryByRole("status")).toBeNull();
        expect(stages).toHaveLength(0);
    });

    it("builds the stage in the container with the renderer and light probe", () => {
        const { container } = view(adapters());
        const [stage] = stages;
        expect(stage.container).toBe(container.firstChild);
        expect(stage.options).toEqual({ renderer, environment, animate: true });
    });

    it("holds the model still for viewers who prefer reduced motion", () => {
        vi.spyOn(window, "matchMedia").mockImplementation(
            query =>
                ({
                    matches: query === "(prefers-reduced-motion: reduce)"
                }) as MediaQueryList
        );
        view(adapters());
        expect(stages[0].options.animate).toBe(false);
    });

    it("shows the model and fades the poster once it loads", async () => {
        const load = deferred<Object3D>();
        const loadModel = vi.fn(() => load.promise);
        const { container } = view(adapters({ loadModel }));
        await act(async () => load.resolve(model));
        expect(loadModel).toHaveBeenCalledWith("/car.glb");
        expect(stages[0].show).toHaveBeenCalledWith(model);
        expect(container.firstChild).toHaveAttribute("data-status", "ready");
        expect(screen.getByRole("img", { name: "A car" })).toHaveClass(
            "opacity-0"
        );
        expect(screen.queryByRole("status")).toBeNull();
    });

    it("falls back to the poster when the model fails to load", async () => {
        const load = deferred<Object3D>();
        const { container } = view(adapters({ loadModel: () => load.promise }));
        await act(async () => load.reject(new Error("404")));
        expect(container.firstChild).toHaveAttribute(
            "data-status",
            "unavailable"
        );
        expect(screen.getByRole("img", { name: "A car" })).not.toHaveClass(
            "opacity-0"
        );
    });

    it("forwards container size and visibility to the stage", () => {
        view(adapters());
        observers.resize!(
            [
                {
                    contentRect: { width: 640, height: 320 }
                } as ResizeObserverEntry
            ],
            {} as ResizeObserver
        );
        observers.visibility!(
            [{ isIntersecting: true } as IntersectionObserverEntry],
            {} as IntersectionObserver
        );
        expect(stages[0].resize).toHaveBeenCalledWith(640, 320);
        expect(stages[0].setActive).toHaveBeenCalledWith(true);
    });

    it("tears everything down on unmount and ignores a late load", async () => {
        const load = deferred<Object3D>();
        const { unmount } = view(adapters({ loadModel: () => load.promise }));
        unmount();
        expect(disconnects.resize).toHaveBeenCalled();
        expect(disconnects.visibility).toHaveBeenCalled();
        expect(stages[0].dispose).toHaveBeenCalledOnce();
        await act(async () => load.resolve(model));
        expect(stages[0].show).not.toHaveBeenCalled();
    });

    it("ignores a late failure after unmount", async () => {
        const load = deferred<Object3D>();
        const errors = vi.spyOn(console, "error");
        const { unmount } = view(adapters({ loadModel: () => load.promise }));
        unmount();
        await act(async () => load.reject(new Error("aborted")));
        expect(errors).not.toHaveBeenCalled();
    });

    it("uses the WebGL adapters by default", async () => {
        const { webglAdapters } = await import("@/lib/model-viewer/adapters");
        const createRenderer = vi
            .spyOn(webglAdapters, "createRenderer")
            .mockImplementation(() => {
                throw new Error("no WebGL");
            });
        render(<ModelViewer src="/car.glb" poster={poster} alt="A car" />);
        expect(createRenderer).toHaveBeenCalledOnce();
    });
});
