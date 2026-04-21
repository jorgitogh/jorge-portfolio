import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>
) {
  if (!canvasDiv.current) return;
  let canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = canvas3d.width;
  const height = canvas3d.height;
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  ScrollTrigger.refresh();
}
