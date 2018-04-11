import * as THREE from './three.min.js';
import * as OrbitControls from './OrbitControls.js';
import * as FBXLoader from './FBXLoader.js';

// Variable
let container, controls;
export let doll;
let camera, scene, renderer, light, particles, geometry, material, parameters, i, h, color, sprite, size;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

export function init() {

  // Div
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  // Camera
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set(-40,50,90);

  controls = new THREE.OrbitControls( camera );
  controls.target.set( 0, 0, 0 );
  controls.update();

  // scene
  scene = new THREE.Scene();

  // Light
  var light = new THREE.DirectionalLight( 0xffffff, 0.5);
  light.position.set( 0, 100, 0 );
  scene.add( light );
  var secondLight = new THREE.HemisphereLight( 0xffffff,0x080820, 0.7);
  secondLight.position.set(0,0,0);
  scene.add( secondLight );
  scene.add( camera );

  // model
  var loader = new THREE.FBXLoader();
  loader.load( "models/Doll.fbx", function ( object ) {
    doll = object;
    scene.add( doll );
  });

  geometry = new THREE.Geometry();
  var textureLoader = new THREE.TextureLoader();
  var sprite1 = textureLoader.load( "snowflake.png" );
  
  for ( i = 0; i < 10000; i ++ ) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2000 - 1000;
    vertex.y = Math.random() * 2000 - 1000;
    vertex.z = Math.random() * 2000 - 1000;
    geometry.vertices.push( vertex );
  }

  parameters = [
    [ [1.0, 0.2, 0.5], sprite1, 20 ],
    [ [0.95, 0.1, 0.5], sprite1, 15 ],
    [ [0.90, 0.05, 0.5], sprite1, 10 ]
  ];

  for ( i = 0; i < parameters.length; i ++ ) {

    color  = parameters[i][0];
    sprite = parameters[i][1];
    size   = parameters[i][2];
    material = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } );
    material.color.setHSL( color[0], color[1], color[2] );
    particles = new THREE.Points( geometry, material );
    particles.rotation.x = Math.random() * 6;
    particles.rotation.y = Math.random() * 6;
    particles.rotation.z = Math.random() * 6;
    scene.add( particles );
  }

  // Render
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth -20, window.innerHeight-20 );
  renderer.shadowMap.enabled = true;
  container.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize, false );
}

// Scene size
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// Scene animation
export function animate() {
  requestAnimationFrame( animate );

  controls.update();
  render();
}

function render(){
  var time = Date.now() * 0.00005;
  for ( i = 0; i < scene.children.length; i ++ ) {
    var object = scene.children[ i ];
    if ( object instanceof THREE.Points ) {
      object.rotation.x = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
      object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
    }
  }
  for ( i = 0; i < 3; i ++ ) {
    color = parameters[i][0];
    h = ( 360 * ( color[0] + time ) % 360 ) / 360;
    material.color.setHSL( h, color[1], color[2] );
  }

  renderer.render( scene, camera );
}