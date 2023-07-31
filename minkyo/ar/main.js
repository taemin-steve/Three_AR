import * as THREE from "../../node_modules/three/build/three.module.js";
// ./node_modules/three/examples/jsm/  << ~~~addons/

import { OrbitControls } from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";
import myJson from "./camera.json" assert { type: "json" };

let camera, scene, renderer, video;

const W = 2048;
const H = 1024;

var calibtn = document.getElementById("calibtn");
calibtn.addEventListener("click", caliStart);

// websocket
var url = "ws://localhost:3000";
var ws = new WebSocket(url);

settingWebSocket();

//canvas
var canvas = document.getElementById("videoOutput");
canvas.width = W;
canvas.height = H;
var bitmap = null;
var ctx = canvas.getContext("2d");

init();
animate();

function init() {
  let threeDiv = document.querySelector("#three");
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 0.01;

  scene = new THREE.Scene();

  video = document.getElementById("video");

  const texture = new THREE.VideoTexture(video);

  const geometry = new THREE.PlaneGeometry(16, 9);
  geometry.scale(0.5, 0.5, 0.5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.useLegacyLights = false;
  threeDiv.appendChild(renderer.domElement);

  //--- camera instric 적용.
  let ratio_x_pix = 0.1 / myJson.intrisic_mtx.data[0];
  let ratio_y_pix = 0.1 / myJson.intrisic_mtx.data[4];
  let sensor_w = ratio_x_pix * window.innerWidth; // 필름 w
  let sensor_h = ratio_y_pix * window.innerHeight; // 필름 h

  // aspect  = sensor_w / sensor_h
  camera.aspect = sensor_w / sensor_h;
  camera.filmGauge = sensor_w;
  camera.setFocalLength(1);
  //----
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;

  scene.background = texture;

  const geometry1 = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry1, material);
  cube.position.x = 0;
  cube.position.y = 0;
  cube.position.z = -50;
  scene.add(cube);

  window.addEventListener("resize", onWindowResize);
  //

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const constraints = {
      video: {
        zoom: { ideal: 1 },
        deviceId: camera.length
          ? { ideal: camera[camera.length - 1] } // 마지막 index의 카메라 선택
          : null,
        width: W,
        height: H,
        facingMode: "environment",
      },
    };
    /*
     zoom: { ideal: 1 },
        deviceId: camera.length
          ? { ideal: camera[camera.length - 1] } // 마지막 index의 카메라 선택
          : null,
     */
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        video.srcObject = stream;
        //const interval = (parseInt(1) >= 1 ? 1 * 1 : 1) * 1000;
        //captureInterval = setInterval(async () => {
        //  const bitmap = await createImageBitmap(video);
        //  console.log(bitmap);
        //}, interval);
      })
      .catch(function (error) {
        console.error("Unable to access the camera/webcam.", error);
      });
  } else {
    console.error("MediaDevices interface not available.");
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function processImage() {
  ctx.drawImage(video, 0, 0, W, H);
  setTimeout(processImage, 1);
}
processImage();

function sendImage() {
  var rawData = canvas.toDataURL("image/jpeg", 0.5);
  ws.send(rawData);
}

var interval;
// 칼리브레이션 시작.
function caliStart() {
  interval = setInterval(sendImage, 10); // 10/1000에 한번씩 sendImage() 함수 실행.
  calibtn.addEventListener("click", calibStop);
  calibtn.innerText = "stop"; // 버튼 이름 변경.
}

// 칼리브레이션 버튼 스탑. -> 구현 안됨.
function calibStop() {
  clearInterval(interval);
  console.log("stop");
  calibtn.innerText = "Calibration";
  calibtn.addEventListener("click", caliStart);
}

// 웹소켓 셋팅
function settingWebSocket() {
  ws.binaryType = "arraybuffer"; // binary type을 array buffer로 설정.
  ws.onopen = function () {
    console.log("Websocket is connected.");
  };

  ws.onmessage = function (msg) {
    console.log(msg.data); //서버로부터 받는 메세지.
  };
}

function settingCamera() {}
