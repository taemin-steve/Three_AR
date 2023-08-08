import * as THREE from "three";
import { ARButton } from "./myArButton.js";

let camera, scene, renderer;
let controller;
let divRight = document.getElementsByClassName("right")[0];
let imgElement = document.getElementById("imageSrc");

imgElement.onload = function () {
  let mat = cv.imread(imgElement);
  cv.imshow("canvasOutput", mat);
  mat.delete();
};

init();
animate();

function init() {
  const container = document.createElement("div");

  var divLeft = document.getElementsByClassName("left")[0];
  divLeft.appendChild(container);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    20
  );

  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.useLegacyLights = false;
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);

  document.body.appendChild(ARButton.createButton(renderer));

  const geometry = new THREE.CylinderGeometry(0, 0.05, 0.2, 32).rotateX(
    Math.PI / 2
  );

  function onSelect() {
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff * Math.random(),
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -0.3).applyMatrix4(controller.matrixWorld);
    mesh.quaternion.setFromRotationMatrix(controller.matrixWorld);
    scene.add(mesh);
  }

  controller = renderer.xr.getController(0);
  controller.addEventListener("select", onSelect);
  scene.add(controller);

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.setAnimationLoop(render);
}

function render() {
  renderer.render(scene, camera);
  var imgData = renderer.domElement;
  imgElement = imgData;
}
