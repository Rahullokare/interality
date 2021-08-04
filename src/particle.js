import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Debug

// Canvas
const canvas = document.querySelector("canvas.webgl2");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const particlesGeometry = new THREE.BufferGeometry();
const particleCnt = 5000;

const posArray = new Float32Array(particleCnt * 3);

for (let i = 0; i < particleCnt * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);
// Materials

const material = new THREE.PointsMaterial({
  size: 0.005,
  color: "#f7f",
});
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.005,
  color: "#97bbcd",
});

// Mesh
const sphere = new THREE.Points(geometry, material);
const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);

scene.add(sphere, particleMesh);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//mouse
document.addEventListener("mousemove", animateParticles);
let mouseX = 0;
let mouseY = 0;
function animateParticles(event) {
  mouseY = event.clientY;
  mouseX = event.clientX;
}
/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;
  particleMesh.rotation.x = -mouseY * (elapsedTime * 0.00008);
  particleMesh.rotation.y = -mouseX * (elapsedTime * 0.00008);
  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
