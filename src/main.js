import {Controller} from 'leapjs';
import {getCoords2} from './utils.js';
import {init, doll, animate} from './loader.js';
import {inputs} from './inputs.js';

// Variable
const myController = new Controller();
let centerBone, circleActiv = false, time = 0, swipeActiv = false, speedActivity = false;
let audio = new Audio('OnceUponaDecember.mp3');

myController.connect();

myController.on('frame', frame => {
	frame.hands.forEach(hand => {

		//Finger
		hand.fingers.forEach(finger => {
			if(hand.type === "left"){
				// Finger bones
				let itip = getCoords2(hand.indexFinger.tipPosition, frame);
				let mtip = getCoords2(hand.middleFinger.tipPosition, frame);
				let rtip = getCoords2(hand.ringFinger.tipPosition, frame);
				let ptip = getCoords2(hand.pinky.tipPosition, frame);
				let ttip = getCoords2(hand.thumb.tipPosition, frame);
				let lPalmPosition = getCoords2(hand.palmVelocity, frame);
				
	    		let tbone = doll.children[1].skeleton.bones[1];
	    		let hbone = doll.children[1].skeleton.bones[2];
				let rabones1 = doll.children[1].skeleton.bones[3];
				let rabones2 = doll.children[1].skeleton.bones[4];
				let labones1 = doll.children[1].skeleton.bones[6];
				let labones2 = doll.children[1].skeleton.bones[7];
	    		let llbones1 = doll.children[1].skeleton.bones[9];
	    		let llbones2 = doll.children[1].skeleton.bones[10];
	    		let rlbones1 = doll.children[1].skeleton.bones[12];
	    		let rlbones2 = doll.children[1].skeleton.bones[13];

				if(speedActivity === false) {
					// Right Arm
						// Shoulders
			    		rabones1.rotation.z = ptip.z * 3;
			    		rabones1.rotation.x = ptip.x * 3;
			    		// Elbows
			    		rabones2.rotation.z = (rtip.z - 0.4) * 3;

		    		// Left Arm
						// Shoulders
			    		labones1.rotation.z = ptip.z * (-3);
			    		labones1.rotation.x = ptip.x * (-3);
			    		// Elbows
			    		labones2.rotation.z = (rtip.z - 0.4) * (-3);	

		    		// Right Leg
			    		// Pelvis
			    		llbones1.rotation.z = mtip.z * (-3);
			    		// Knees
			    		llbones2.rotation.z = rtip.z * (-2);

		    		// Head
		    			hbone.rotation.z = itip.z ;

		    		// Torso
		    			tbone.rotation.z = lPalmPosition.x * (0.25);
		    			tbone.rotation.y = lPalmPosition.x * (0.25);
	    		} 
	    		else if (speedActivity === true){
		    		// Right Arm
						// Shoulders
			    		rabones1.rotation.z = ptip.z * 4;
			    		rabones1.rotation.x = ptip.x * 4;
			    		// Elbows
			    		rabones2.rotation.z = (rtip.z - 0.4) * 4;

		    		// Left Arm
						// Shoulders
			    		labones1.rotation.z = ptip.z * (-4);
			    		labones1.rotation.x = ptip.x * (-4);
			    		// Elbows
			    		labones2.rotation.z = (rtip.z - 0.4) * (-4);	

		    		// Right Leg
			    		// Pelvis
			    		llbones1.rotation.z = mtip.z * (-4);
			    		// Knees
			    		llbones2.rotation.z = rtip.z * (-3);

		    		// Left Leg
			    		// Pelvis
			    		rlbones1.rotation.z = mtip.z * (4);
			    		// Knees
			    		rlbones2.rotation.z = rtip.z * (3);

		    		// Head
		    			hbone.rotation.z = itip.z ;

		    		// Torso
		    			tbone.rotation.z = lPalmPosition.x * (0.5);
		    			tbone.rotation.y = lPalmPosition.x * (0.5);
	    		};
		    }
		    else if(hand.type === "right"){
		    	
		    	frame.gestures.forEach(gesture => {
			    	let itip = getCoords2(hand.indexFinger.tipPosition, frame);

			    	// event circle
			    	centerBone = doll.children[1].skeleton.bones[0];
			    	switch (gesture.type) {
				    	case 'circle'   : 
				      	if(time === 0){
				      		time = 1;
				      		circleActiv = true;
				      		setTimeout(Desactivation, 1000);
				      	} else if (time === 2){
				      		time = 3;
				      		circleActiv = false;
				      		setTimeout(Desactivation, 1000);
				      	};
  						break;
  						case 'swipe'  : 				      	
  						if(time === 0){
				      		time = 1;
				      		swipeActiv = true;
				      		setTimeout(Desactivation, 1000);
				      	} else if (time === 2){
				      		time = 3;
				      		swipeActiv = false;
				      		setTimeout(Desactivation, 1000);
				      	};
				      	break;
				    };
			    });
		    }
		});
	});
});
// Rotation character (first loop) + music play/pause
setInterval(AnimateDool,1000/30);
function AnimateDool(){
	if (centerBone != undefined) {
		if (circleActiv === true) {
			centerBone.rotation.x += 0.05;
			audio.play();
		} else {
			audio.pause();
		};
		if(swipeActiv === true) {
			speedActivity = true;
		} else {
			speedActivity = false;
		};
	};
};
// Rotation character (second loop)
function Desactivation(){
	if(time === 1){
		time = 2;
  	}else if (time === 3){
  		time = 0;
  	};	
};
// Loader
console.log(inputs);
init();
animate();