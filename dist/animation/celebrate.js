
import * as THREE from 'https://cdn.skypack.dev/three@0.130.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/loaders/GLTFLoader.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.5, 1000);
camera.position.z = -50;
// camera.position.y = 20;

// Remove the background
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the 3D Model
const loader = new GLTFLoader();
let model;
let mixer; // Animation mixer
let animationComplete = false; // Flag to track animation completion
let isVisible = true; // Flag to track visibility of the model

loader.load('/dist/animation/celebrate.glb', function (gltf) {
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
const lights = [
    new THREE.DirectionalLight(0xffffff, 1),
    new THREE.DirectionalLight(0xffffff, 1),
    new THREE.DirectionalLight(0xffffff, 1),
    new THREE.DirectionalLight(0xffffff, 1),
    new THREE.DirectionalLight(0xffffff, 0.5),
    new THREE.DirectionalLight(0xffffff, 1)
];
lights[0].position.set(1, 1, 1).normalize();
lights[1].position.set(-1, -1, -1).normalize();
lights[2].position.set(1, -1, 1).normalize();
lights[3].position.set(-1, 1, -1).normalize();
lights[4].position.set(-1, 1, 1).normalize();
lights[5].position.set(1, -1, -1).normalize();
lights.forEach((light) => scene.add(light));

// Add controls for mouse interaction
const controls = new OrbitControls(camera, renderer.domElement);


// Animation function
function animate() {
    requestAnimationFrame(animate);

    // Update the animation mixer
    if (mixer && !animationComplete) {
        mixer.update(0.015); // Pass the time delta between frames
    }

    // Check if the animation has finished
    if (mixer && mixer.time >= mixer.timeScale * mixer.duration) {
        animationComplete = true;
        hideModel(); // Call hideModel() function when the animation is complete
    }

    // Render the scene
    renderer.render(scene, camera);

    // Stop the animation loop after it completes
    if (animationComplete) {
        cancelAnimationFrame(animate);
    }
}

// Function to hide the model
function hideModel() {
    if (isVisible) {
        scene.remove(model); // Remove the model from the scene
        isVisible = false;
    }
}

// Start the animation
animate();
