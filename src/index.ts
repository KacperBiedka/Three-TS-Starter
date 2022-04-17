import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

let stats: Stats;

const initStats = () => {
  stats = new (Stats as any)();
  document.body.appendChild(stats.dom);
};

const initListeners = () => {
  window.addEventListener("resize", onWindowResize.bind(this), false);
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const animate = () => {
  requestAnimationFrame(() => {
    animate();
  });

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  if (stats) stats.update();

  if (controls) controls.update();

  renderer.render(scene, camera);
};

initStats();
initListeners();
animate();
