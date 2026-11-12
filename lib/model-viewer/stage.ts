import {
    Box3,
    DataTexture,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    Vector3,
    type Object3D,
    type Texture
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { boxCorners, fitOrbitDistance, type Point3 } from "./framing";

/** The slice of WebGLRenderer the stage uses, so tests can supply a fake. */
export interface StageRenderer {
    readonly domElement: HTMLCanvasElement;
    setPixelRatio(ratio: number): void;
    setSize(width: number, height: number): void;
    render(scene: Scene, camera: PerspectiveCamera): void;
    dispose(): void;
}

export interface FrameScheduler {
    requestFrame(callback: () => void): number;
    cancelFrame(handle: number): void;
}

export interface StageOptions {
    renderer: StageRenderer;
    environment: Texture | null;
    /** False when the viewer prefers reduced motion: the model holds still until dragged. */
    animate: boolean;
    scheduler?: FrameScheduler;
}

const FIELD_OF_VIEW = 30;
const ELEVATION = (16 * Math.PI) / 180;
/** Front three-quarter view; the poster image is rendered from this pose. */
const REST_AZIMUTH = (38 * Math.PI) / 180;
const FRAME_MARGIN = 1.06;

const browserScheduler: FrameScheduler = {
    requestFrame: callback => requestAnimationFrame(callback),
    cancelFrame: handle => cancelAnimationFrame(handle)
};

/** A soft radial falloff used as a contact shadow under the model. */
export function createShadowTexture(size = 64): DataTexture {
    const pixels = new Uint8Array(size * size * 4);
    const half = (size - 1) / 2;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const distance = Math.hypot((x - half) / half, (y - half) / half);
            const falloff = Math.max(0, 1 - distance) ** 2;
            pixels[(y * size + x) * 4 + 3] = Math.round(falloff * 140);
        }
    }
    const texture = new DataTexture(pixels, size, size);
    texture.needsUpdate = true;
    return texture;
}

/**
 * Owns one three.js scene: camera, turntable controls, lighting environment,
 * the render loop and cleanup. React only mounts it, feeds it a model and sizes it.
 */
export class ModelStage {
    readonly scene = new Scene();
    readonly camera = new PerspectiveCamera(FIELD_OF_VIEW, 1, 0.01, 100);
    readonly controls: OrbitControls;

    private readonly renderer: StageRenderer;
    private readonly scheduler: FrameScheduler;
    private corners: Point3[] = [];
    private frameHandle: number | null = null;
    private active = false;
    private hasModel = false;

    constructor(container: HTMLElement, options: StageOptions) {
        this.renderer = options.renderer;
        this.scheduler = options.scheduler ?? browserScheduler;
        this.scene.environment = options.environment;

        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        this.controls.enableDamping = true;
        this.controls.autoRotate = options.animate;
        this.controls.autoRotateSpeed = 0.8;
        // A turntable: the camera circles at a fixed height, so the framing holds at every angle.
        this.controls.minPolarAngle = Math.PI / 2 - ELEVATION;
        this.controls.maxPolarAngle = Math.PI / 2 - ELEVATION;
        // Let vertical swipes scroll the page on touch screens; horizontal drags still turn the model.
        this.renderer.domElement.style.touchAction = "pan-y";
    }

    show(model: Object3D): void {
        const bounds = new Box3().setFromObject(model);
        const size = bounds.getSize(new Vector3());
        const center = bounds.getCenter(new Vector3());
        model.position.sub(center).setY(model.position.y + size.y / 2);
        this.scene.add(model);
        this.scene.add(this.createShadow(size));

        const target = new Vector3(0, size.y * 0.4, 0);
        this.controls.target.copy(target);
        this.corners = boxCorners(
            { x: -size.x / 2, y: -target.y, z: -size.z / 2 },
            { x: size.x / 2, y: size.y - target.y, z: size.z / 2 }
        );
        const distance = this.frameDistance();
        const horizontal = distance * Math.cos(ELEVATION);
        this.camera.position.set(
            horizontal * Math.sin(REST_AZIMUTH),
            target.y + distance * Math.sin(ELEVATION),
            horizontal * Math.cos(REST_AZIMUTH)
        );
        this.camera.lookAt(target);
        this.hasModel = true;
        this.schedule();
    }

    resize(width: number, height: number): void {
        if (width === 0 || height === 0) return;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.frameDistance();
        this.schedule();
    }

    setActive(active: boolean): void {
        this.active = active;
        this.schedule();
    }

    dispose(): void {
        this.active = false;
        if (this.frameHandle !== null)
            this.scheduler.cancelFrame(this.frameHandle);
        this.frameHandle = null;
        this.controls.dispose();
        this.renderer.domElement.remove();
        this.renderer.dispose();
    }

    private createShadow(size: Vector3): Mesh {
        const shadow = new Mesh(
            new PlaneGeometry(size.x * 1.6, size.z * 1.25),
            new MeshBasicMaterial({
                map: createShadowTexture(),
                transparent: true,
                depthWrite: false
            })
        );
        shadow.rotation.x = -Math.PI / 2;
        shadow.position.y = 0.002;
        return shadow;
    }

    /** Zoom is off, so pinning both limits makes the controls hold the fitted distance. */
    private frameDistance(): number {
        const distance = fitOrbitDistance(this.corners, {
            verticalFovDegrees: FIELD_OF_VIEW,
            aspect: this.camera.aspect,
            elevation: ELEVATION,
            margin: FRAME_MARGIN
        });
        this.controls.minDistance = distance;
        this.controls.maxDistance = distance;
        return distance;
    }

    private schedule(): void {
        if (!this.active || !this.hasModel || this.frameHandle !== null) return;
        this.frameHandle = this.scheduler.requestFrame(this.tick);
    }

    private readonly tick = (): void => {
        this.frameHandle = null;
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.schedule();
    };
}
