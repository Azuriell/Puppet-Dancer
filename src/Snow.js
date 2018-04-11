import * as THREE from './three.min.js';
let TO_RADIANS = Math.PI / 180;
let cosRY,sinRY;

// console.log(Particle3D);
export function Particle3D(material) {
    THREE.Sprite.call(this, material);
    //this.material = material instanceof Array ? material : [ material ];
    // define properties
    this.velocity = new THREE.Vector3(0, -8, 0);
    this.velocity.rotateX(randomRange(-45, 45));
    this.velocity.rotateY(randomRange(0, 360));
    this.gravity = new THREE.Vector3(0, 0, 0);
    this.drag = 1;
    // methods... 
};
Particle3D.prototype = new THREE.Sprite();
Particle3D.prototype.constructor = Particle3D;

Particle3D.prototype.updatePhysics = function() {
    // console.log(this);
    this.velocity.multiplyScalar(this.drag);
    this.velocity.add(this.gravity);
    this.position.add(this.velocity);
}

THREE.Vector3.prototype.rotateY = function(angle) {
    cosRY = Math.cos(angle * TO_RADIANS);
    sinRY = Math.sin(angle * TO_RADIANS);

    let tempz = this.z;;
    let tempx = this.x;

    this.x = (tempx * cosRY) + (tempz * sinRY);
    this.z = (tempx * -sinRY) + (tempz * cosRY);
}

THREE.Vector3.prototype.rotateX = function(angle) {
    cosRY = Math.cos(angle * TO_RADIANS);
    sinRY = Math.sin(angle * TO_RADIANS);

    let tempz = this.z;;
    let tempy = this.y;

    this.y = (tempy * cosRY) + (tempz * sinRY);
    this.z = (tempy * -sinRY) + (tempz * cosRY);
}

THREE.Vector3.prototype.rotateZ = function(angle) {
    cosRY = Math.cos(angle * TO_RADIANS);
    sinRY = Math.sin(angle * TO_RADIANS);

    let tempx = this.x;;
    let tempy = this.y;

    this.y = (tempy * cosRY) + (tempx * sinRY);
    this.x = (tempy * -sinRY) + (tempx * cosRY);
}

// returns a random number between the two limits provided 

function randomRange(min, max) {
    return ((Math.random() * (max - min)) + min);
}

