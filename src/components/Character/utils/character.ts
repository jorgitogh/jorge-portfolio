import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { decryptFile } from "./decrypt";

const BLONDE_ACCENT_COLOR = "#c7a35a";

function tintBlondeMaterial(material: THREE.Material) {
  if (!("color" in material) || !(material.color instanceof THREE.Color)) {
    return material;
  }

  const nextMaterial = material.clone() as THREE.MeshStandardMaterial;
  nextMaterial.color.set(BLONDE_ACCENT_COLOR);
  nextMaterial.metalness = Math.min(nextMaterial.metalness ?? 0, 0.08);
  nextMaterial.roughness = 0.72;
  nextMaterial.needsUpdate = true;

  return nextMaterial;
}

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            // `compileAsync` logs a warning on browsers without
            // `KHR_parallel_shader_compile`. Synchronous precompile is enough here.
            renderer.compile(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                const meshName = mesh.name.toLowerCase();
                child.castShadow = false;
                child.receiveShadow = false;
                mesh.frustumCulled = true;
                if (
                  meshName.includes("hair") ||
                  meshName.includes("eyebrow") ||
                  meshName.includes("brow")
                ) {
                  mesh.material = Array.isArray(mesh.material)
                    ? mesh.material.map(tintBlondeMaterial)
                    : tintBlondeMaterial(mesh.material);
                }
                if (mesh.material && !Array.isArray(mesh.material)) {
                  (mesh.material as THREE.ShaderMaterial).precision = "mediump";
                }
              }
            });
            resolve(gltf);
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
