import {
    ACESFilmicToneMapping,
    PMREMGenerator,
    SRGBColorSpace,
    WebGLRenderer,
    type Object3D,
    type Texture
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

/** The WebGL-backed pieces of the viewer, swappable for tests. */
export interface ViewerAdapters {
    createRenderer(): WebGLRenderer;
    createEnvironment(renderer: WebGLRenderer): Texture;
    loadModel(url: string): Promise<Object3D>;
}

/** Throws when the browser cannot create a WebGL context. */
function createRenderer(): WebGLRenderer {
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    return renderer;
}

/** A neutral studio light probe; metallic paint has nothing to reflect without one. */
function createEnvironment(renderer: WebGLRenderer): Texture {
    const generator = new PMREMGenerator(renderer);
    const environment = generator.fromScene(
        new RoomEnvironment(),
        0.04
    ).texture;
    generator.dispose();
    return environment;
}

async function loadModel(url: string): Promise<Object3D> {
    const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    const gltf = await loader.loadAsync(url);
    return gltf.scene;
}

export const webglAdapters: ViewerAdapters = {
    createRenderer,
    createEnvironment,
    loadModel
};
