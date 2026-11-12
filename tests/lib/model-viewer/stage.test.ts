import {
    Box3,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    Vector3,
    type PerspectiveCamera,
    type Scene
} from "three";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
    createShadowTexture,
    ModelStage,
    type FrameScheduler,
    type StageRenderer
} from "@/lib/model-viewer/stage";

class FakeRenderer implements StageRenderer {
    readonly domElement = document.createElement("canvas");
    pixelRatio = 0;
    size: [number, number] | null = null;
    renders = 0;
    disposed = false;
    setPixelRatio(ratio: number) {
        this.pixelRatio = ratio;
    }
    setSize(width: number, height: number) {
        this.size = [width, height];
    }
    render(_scene: Scene, _camera: PerspectiveCamera) {
        this.renders++;
    }
    dispose() {
        this.disposed = true;
    }
}

class ManualScheduler implements FrameScheduler {
    pending = new Map<number, () => void>();
    private next = 1;
    requestFrame(callback: () => void) {
        const handle = this.next++;
        this.pending.set(handle, callback);
        return handle;
    }
    cancelFrame(handle: number) {
        this.pending.delete(handle);
    }
    runFrame() {
        const [[handle, callback]] = this.pending;
        this.pending.delete(handle);
        callback();
    }
}

const ELEVATION = (16 * Math.PI) / 180;

function setup(animate = true) {
    const container = document.createElement("div");
    const renderer = new FakeRenderer();
    const scheduler = new ManualScheduler();
    const stage = new ModelStage(container, {
        renderer,
        environment: null,
        animate,
        scheduler
    });
    return { container, renderer, scheduler, stage };
}

/** A 4.4 × 1.2 × 2 car-sized box sitting off-centre and below the ground. */
const carBox = () => {
    const mesh = new Mesh(
        new BoxGeometry(4.4, 1.2, 2),
        new MeshBasicMaterial()
    );
    mesh.position.set(3, -5, 1);
    return mesh;
};

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("createShadowTexture", () => {
    it("is darkest at the centre and clear at the edges", () => {
        const { image } = createShadowTexture(3);
        const alpha = (x: number, y: number) =>
            image.data![(y * 3 + x) * 4 + 3];
        expect(alpha(1, 1)).toBe(140);
        expect([alpha(0, 0), alpha(1, 0), alpha(2, 2)]).toEqual([0, 0, 0]);
        expect(createShadowTexture().image.width).toBe(64);
    });
});

describe("ModelStage", () => {
    it("mounts its canvas as a touch-scrollable turntable", () => {
        vi.stubGlobal("devicePixelRatio", 3);
        const { container, renderer, stage } = setup();
        expect(container.contains(renderer.domElement)).toBe(true);
        expect(renderer.pixelRatio).toBe(2);
        expect(renderer.domElement.style.touchAction).toBe("pan-y");
        expect(stage.controls.enableZoom).toBe(false);
        expect(stage.controls.enablePan).toBe(false);
        expect(stage.controls.minPolarAngle).toBeCloseTo(
            Math.PI / 2 - ELEVATION
        );
        expect(stage.controls.maxPolarAngle).toBeCloseTo(
            Math.PI / 2 - ELEVATION
        );
    });

    it("turns on its own unless motion is reduced", () => {
        expect(setup(true).stage.controls.autoRotate).toBe(true);
        expect(setup(false).stage.controls.autoRotate).toBe(false);
    });

    it("stands the model on the ground, centred, at the front three-quarter view", () => {
        const { stage } = setup();
        stage.resize(800, 400);
        const model = carBox();
        stage.show(model);

        const bounds = new Box3().setFromObject(model);
        expect(bounds.min.y).toBeCloseTo(0);
        expect(bounds.getCenter(new Vector3()).x).toBeCloseTo(0);
        expect(bounds.getCenter(new Vector3()).z).toBeCloseTo(0);

        const offset = stage.camera.position.clone().sub(stage.controls.target);
        expect(Math.atan2(offset.x, offset.z)).toBeCloseTo(
            (38 * Math.PI) / 180
        );
        expect(Math.asin(offset.y / offset.length())).toBeCloseTo(ELEVATION);
        expect(offset.length()).toBeCloseTo(stage.controls.minDistance);
        expect(stage.controls.maxDistance).toBe(stage.controls.minDistance);
    });

    it("keeps every corner of the model inside the frame", () => {
        const { stage } = setup();
        stage.resize(800, 400);
        const model = carBox();
        stage.show(model);
        stage.camera.updateMatrixWorld();
        const { min, max } = new Box3().setFromObject(model);
        for (const x of [min.x, max.x])
            for (const y of [min.y, max.y])
                for (const z of [min.z, max.z]) {
                    const ndc = new Vector3(x, y, z).project(stage.camera);
                    expect(Math.abs(ndc.x)).toBeLessThanOrEqual(
                        1 / 1.06 + 1e-9
                    );
                    expect(Math.abs(ndc.y)).toBeLessThanOrEqual(
                        1 / 1.06 + 1e-9
                    );
                }
    });

    it("adds a contact shadow under the model", () => {
        const { stage } = setup();
        stage.show(carBox());
        const shadow = stage.scene.children[1] as Mesh;
        expect(shadow.position.y).toBeGreaterThan(0);
        expect(shadow.rotation.x).toBeCloseTo(-Math.PI / 2);
    });

    it("ignores a zero-sized container", () => {
        const { renderer, stage } = setup();
        stage.resize(0, 300);
        stage.resize(300, 0);
        expect(renderer.size).toBeNull();
    });

    it("sizes the renderer and refits the distance on resize", () => {
        const { renderer, stage } = setup();
        stage.show(carBox());
        stage.resize(800, 400);
        const wide = stage.controls.minDistance;
        stage.resize(400, 400);
        expect(renderer.size).toEqual([400, 400]);
        expect(stage.camera.aspect).toBe(1);
        expect(stage.controls.minDistance).toBeGreaterThan(wide);
    });

    it("renders only while visible and holding a model", () => {
        const { renderer, scheduler, stage } = setup();
        stage.setActive(true);
        expect(scheduler.pending.size).toBe(0);

        stage.show(carBox());
        expect(scheduler.pending.size).toBe(1);
        stage.setActive(true);
        expect(scheduler.pending.size).toBe(1);

        scheduler.runFrame();
        expect(renderer.renders).toBe(1);
        expect(scheduler.pending.size).toBe(1);

        stage.setActive(false);
        scheduler.runFrame();
        expect(renderer.renders).toBe(2);
        expect(scheduler.pending.size).toBe(0);
    });

    it("cancels the pending frame and releases the renderer on dispose", () => {
        const { container, renderer, scheduler, stage } = setup();
        stage.setActive(true);
        stage.show(carBox());
        stage.dispose();
        expect(scheduler.pending.size).toBe(0);
        expect(container.contains(renderer.domElement)).toBe(false);
        expect(renderer.disposed).toBe(true);
    });

    it("disposes cleanly when no frame is pending", () => {
        const { renderer, stage } = setup();
        stage.dispose();
        expect(renderer.disposed).toBe(true);
    });

    it("uses requestAnimationFrame by default", () => {
        const requestAnimationFrame = vi.fn(() => 7);
        const cancelAnimationFrame = vi.fn();
        vi.stubGlobal("requestAnimationFrame", requestAnimationFrame);
        vi.stubGlobal("cancelAnimationFrame", cancelAnimationFrame);
        const stage = new ModelStage(document.createElement("div"), {
            renderer: new FakeRenderer(),
            environment: null,
            animate: true
        });
        stage.setActive(true);
        stage.show(carBox());
        stage.dispose();
        expect(requestAnimationFrame).toHaveBeenCalledOnce();
        expect(cancelAnimationFrame).toHaveBeenCalledWith(7);
    });
});
