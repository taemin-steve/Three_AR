import * as THREE from '/node_modules/three/build/three.module.js';
import { BoxLineGeometry } from './node_modules/three/examples/jsm/geometries/BoxLineGeometry.js';
import { XRButton } from './node_modules/three/examples/jsm/webxr/XRButton.js';
import { XRControllerModelFactory } from './node_modules/three/examples/jsm/webxr/XRControllerModelFactory.js';
// import * as THREE from 'three';
			import { ARButton } from './node_modules/three/examples/jsm/webxr/ARButton.js';

			let camera, scene, renderer;
			let controller;

			init();
			animate();

			function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );

				const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 3 );
				light.position.set( 0.5, 1, 0.25 );
				scene.add( light );

				//

				renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.useLegacyLights = false;
				renderer.xr.enabled = true;
				container.appendChild( renderer.domElement );

				//

				document.body.appendChild( ARButton.createButton( renderer ) );

				//

				const geometry = new THREE.CylinderGeometry( 0, 0.05, 0.2, 32 ).rotateX( Math.PI / 2 );

				function onSelect() {

					const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
					const mesh = new THREE.Mesh( geometry, material );
					mesh.position.set( 0, 0, - 0.3 ).applyMatrix4( controller.matrixWorld );
					mesh.quaternion.setFromRotationMatrix( controller.matrixWorld );
					scene.add( mesh );

				}

				controller = renderer.xr.getController( 0 );
				controller.addEventListener( 'select', onSelect );
				scene.add( controller );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				renderer.setAnimationLoop( render );

			}

			function render() {

				renderer.render( scene, camera );

			}