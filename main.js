// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// let scene, camera, renderer, avatar, controls;

// init();
// animate();

// function init() {
//   scene = new THREE.Scene();
//   scene.background = new THREE.Color(0xf0f0f0);

//   camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   camera.position.set(0, 1.5, 3);

//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);

//   const light = new THREE.DirectionalLight(0xffffff, 2);
//   light.position.set(2, 2, 2);
//   scene.add(light);

//   const ambient = new THREE.AmbientLight(0xffffff, 1);
//   scene.add(ambient);

//   controls = new OrbitControls(camera, renderer.domElement);
//   controls.enableDamping = true;

//   const loader = new GLTFLoader();
//   loader.load('/model_hair2.glb', (gltf) => {
//      avatar = gltf.scene;
//      avatar.scale.set(1,1,1);
//      scene.add(avatar);
//     avatar.traverse((child) => {
//   if (child.isMesh) {
//     console.log(child.name);
//   }
// });
//   });
  
// }

// // Global functions for buttons
// window.changeHairColor = function(color) {
//   if (!avatar) return;

//   avatar.traverse((child) => {
//     if (child.isMesh && child.name === "avaturn_hair_0") {
//       child.material.color.set(color);
//     }
//   });
// };

// window.changeSkinColor = function(color) {
//   if (!avatar) return;

//   avatar.traverse((child) => {
//     if (
//       child.isMesh &&
//       (child.name === "Wolf3D_Head" || child.name === "Wolf3D_Body")
//     ) {
//       child.material.color.set(color);
//     }
//   });
// };

// window.downloadImage = function() {
//   const link = document.createElement('a');
//   link.download = 'avatar.png';
//   link.href = renderer.domElement.toDataURL();
//   link.click();
// };

// function animate() {
//   requestAnimationFrame(animate);
//   controls.update();
//   renderer.render(scene, camera);
// }



import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;

let avatars = [];
let currentAvatar = null;

let currentHairColor = null;
let currentSkinColor = null;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.5, 3);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lights
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(2, 2, 2);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Load avatars
  loadAvatars();
}

// 🔥 Load all models
function loadAvatars() {
  const paths = [
    '/model_hair1.glb',
    '/model_hair2.glb',
    '/model_hair3.glb'
  ];

  const loader = new GLTFLoader();

  paths.forEach((path, index) => {
    loader.load(
      path,
      (gltf) => {
        const model = gltf.scene;

        model.scale.set(1, 1, 1);
        model.visible = false;

        scene.add(model);
        avatars[index] = model;

        // Debug names (optional)
        model.traverse((child) => {
          if (child.isMesh) {
            console.log(child.name);
          }
        });

        // Show first model
        if (index === 0) {
          model.visible = true;
          currentAvatar = model;
        }
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );
  });
}

// 🔥 Hairstyle switching
window.changeHairStyle = function(index) {
  if (!avatars.length) return;

  avatars.forEach((model, i) => {
    model.visible = (i === index);
  });

  currentAvatar = avatars[index];

  // Reapply previous colors
  if (currentHairColor) changeHairColor(currentHairColor);
  if (currentSkinColor) changeSkinColor(currentSkinColor);
};

// 🔥 Hair color
window.changeHairColor = function(color) {
  if (!currentAvatar) return;

  currentHairColor = color;

  currentAvatar.traverse((child) => {
    if (child.isMesh && child.name.includes("hair")) {
      child.material.color.set(color);
      child.material.needsUpdate = true;
    }
  });
};

// 🔥 Skin color
window.changeSkinColor = function(color) {
  if (!currentAvatar) return;

  currentSkinColor = color;

  currentAvatar.traverse((child) => {
    if (
      child.isMesh &&
      (child.name.includes("body") || child.name.includes("look"))
    ) {
      child.material.color.set(color);
       child.material.needsUpdate = true;
    }
  });
};



// 🔥 Download image
window.downloadImage = function() {
  const link = document.createElement('a');
  link.download = 'avatar.png';
  link.href = renderer.domElement.toDataURL();
  link.click();
};

// 🔄 Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}