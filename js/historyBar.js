//@ts-check
import { config } from './game.js';

//This tracks and displays the most recent
//directions pressed
let directionHistory = [];

export function historyBar(directions, dis){
	let positionX = config.width/2 - 300 + 80 * directionHistory.length;
	const positionY = 550;

	for (const input in directions) {
		if (directions.hasOwnProperty(input) &&
		typeof directions[input] !== 'function') {
			const dir = directions[input];

			if(dir.singlePress){
				directionHistory.push([dir.key, positionX, dis.add.image(positionX, positionY, 'downForwardArrow').setAngle(dir.spriteRotation).setScale(0.5).setTintFill(0x005aed)]);
			}
		}
	}

	if(directionHistory.length >= 9){
		directionHistory[0][2].destroy();
		directionHistory.shift();
        
		directionHistory.forEach(dir => {
			dir[1] -= 80;
			dir[2].setX(dir[1]);
		});
	}
}