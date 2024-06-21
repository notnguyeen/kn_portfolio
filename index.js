import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up the camera
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// Set up the scene
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Set up geometry and materials
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
    color: 0x808080, // Gray color for the main mesh
    flatShading: true
});

const wireMat = new THREE.MeshBasicMaterial({
    color: 0x8B4513, // Brown color for the wireframe
    wireframe: true
});

// Create mesh and wireframe mesh
const mesh = new THREE.Mesh(geo, mat);
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh); // Add wireMesh as a child of mesh
scene.add(mesh);

// Add hemisphere light
const hemiLight = new THREE.HemisphereLight(0xaaaaaa, 0x553300, 1); // Light gray and dark brown
scene.add(hemiLight);

// Handle window resize
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

window.addEventListener('resize', onWindowResize, false);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Add some rotation to the mesh for visual interest
    mesh.rotation.x += 0.0007;
    mesh.rotation.y += 0.001;

    controls.update();
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
