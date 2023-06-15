import * as THREE from 'https://cdn.skypack.dev/three@0.130.0';
import {
    OrbitControls
} from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/controls/OrbitControls.js';
import {
    GLTFLoader
} from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/loaders/GLTFLoader.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.5, 1000);
camera.position.z = -20;

//حذف الخلفية
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the 3D Model
const loader = new GLTFLoader();
let model;
let mixer; // Animation mixer
loader.load('/dist/animation/hello.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);

    // Create the animation mixer
    mixer = new THREE.AnimationMixer(model);

    // Play all animations
    gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
    });

    animate();
});

// Add lights from all directions
const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(1, 1, 1).normalize();
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(-1, -1, -1).normalize();
scene.add(light2);

const light3 = new THREE.DirectionalLight(0xffffff, 1);
light3.position.set(1, -1, 1).normalize();
scene.add(light3);

const light4 = new THREE.DirectionalLight(0xffffff, 1);
light4.position.set(-1, 1, -1).normalize();
scene.add(light4);

const light5 = new THREE.DirectionalLight(0xffffff, 0.5);
light5.position.set(-1, 1, 1).normalize();
scene.add(light5);

const light6 = new THREE.DirectionalLight(0xffffff, 1);
light6.position.set(1, -1, -1).normalize();
scene.add(light6);

// Add controls متاح تحريك المجسم بالماوس
const controls = new OrbitControls(camera, renderer.domElement);

// Animation function
function animate() {
    requestAnimationFrame(animate);

    // Update the animation mixer
    if (mixer) {
        mixer.update(0.016); // Pass the time delta between frames
    }

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation
animate();
