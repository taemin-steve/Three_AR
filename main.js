import * as THREE from '/node_modules/three/build/three.module.js';

// ./node_modules/three/examples/jsm/  << ~~~addons/

// import {cv} from "./node_modules/opencv/opencv.js"
import {cv} from './node_modules/opencv.js/opencv.js';
import cv from './node_modules/opencv.js/opencv.js';



import('./node_modules/opencv.js/opencv.js').then(cv => {
	// Use OpenCV.js functions and objects here
	const mat = new cv.Mat(10, 10, cv.CV_8UC3);
	console.log('OpenCV.js version:',  cv.getBuildInformation());
	// Perform image processing operations using OpenCV.js
  }).catch(error => {
	console.log('erro');
	// Handle any errors that occurred while loading OpenCV.js
  });

import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
let camera, scene, renderer, video;
init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
	camera.position.z = 0.01;

	scene = new THREE.Scene();
	video = document.getElementById( 'video' );

	const texture = new THREE.VideoTexture( video );
	const geometry = new THREE.PlaneGeometry( 16, 9 );

	geometry.scale( 0.5, 0.5, 0.5 );
	
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.useLegacyLights = false;
	document.body.appendChild( renderer.domElement );

	const controls = new OrbitControls( camera, renderer.domElement );
	controls.enableZoom = false;
	controls.enablePan = false;

  	scene.background = texture;

	window.addEventListener( 'resize', onWindowResize );
	//
	if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {
		const constraints = { video: { width: 1280, height: 720, facingMode: 'environment' } };
		navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {
			// apply the stream to the video element used in the texture
			video.srcObject = stream;
			video.play();
		} ).catch( function ( error ) {
			console.error( 'Unable to access the camera/webcam.', error );
		} );
	} else {
		console.error( 'MediaDevices interface not available.' );
	}
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}