import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const draco = new DRACOLoader();
draco.setDecoderConfig({ type: "js" });
draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

interface LoadGLTFModelOptions {
    receiveShadow: boolean;
    castShadow: boolean;
}

export function loadGLTFModel(
    scene: THREE.Scene,
    glbPath: string,
    options: LoadGLTFModelOptions = { receiveShadow: true, castShadow: true }
): Promise<THREE.Object3D> {
    const { receiveShadow, castShadow } = options;
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.setDRACOLoader(draco);

        loader.load(
            glbPath,
            (gltf: GLTF) => {
                const obj = gltf.scene;
                obj.name = "dog";
                obj.position.y = 0;
                obj.position.x = 0;
                obj.receiveShadow = receiveShadow;
                obj.castShadow = castShadow;
                scene.add(obj);

                obj.traverse(function (child: THREE.Object3D) {
                    if ((child as THREE.Mesh).isMesh) {
                        (child as THREE.Mesh).castShadow = castShadow;
                        (child as THREE.Mesh).receiveShadow = receiveShadow;
                    }
                });
                resolve(obj);
            },
            undefined,
            (error: unknown) => {
                reject(error);
            }
        );
    });
}
