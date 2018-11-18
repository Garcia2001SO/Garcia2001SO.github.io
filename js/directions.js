//@ts-check
import { config } from './game.js';

function inputFactory(dir, posX, posY, isDiagonal) {
	let cursors;
	let spriteRotation = 0;
    
	switch (dir) {
	case 'd':
		spriteRotation = 45;
		break;
	case 'u':
		spriteRotation = 225;
		break;
	case 'f':
		spriteRotation = 315;
		break;
	case 'b':
		spriteRotation = 135;
		break;
	case 'df':
		spriteRotation = 0;
		break;
	case 'db':
		spriteRotation = 90;
		break;
	case 'uf':
		spriteRotation = 270;
		break;
	case 'ub':
		spriteRotation = 180;
		break;
	default:
		break;
	}
	
	return {
		sprite: '',
		key: dir,
		spriteRotation,
		isDown: false,
		singlePress: false,
		intermediate: false,
		bufferBool: false,
		cursors,
		X: config.width/2 + posX,
		Y: config.height/2 + posY,
		isDiagonal
	};
}

//dir, posX, posY, isDiagonal
const inputDown = inputFactory('d', -100, 45, false);
const inputUp = inputFactory('u', -100, -120, false);
const inputForward = inputFactory('f', 0, -50, false);
const inputBack = inputFactory('b', -200, -50, false);
const inputDownForward = inputFactory('df', 0, 45, true);
const inputDownBack = inputFactory('db', -200, 45, true);
const inputUpForward = inputFactory('uf', 0, -120, true);
const inputUpBack = inputFactory('ub', -200, -120, true);

export const directions = {
	inputDown,
	inputUp,
	inputForward,
	inputBack,
	inputDownForward,
	inputDownBack,
	inputUpForward,
	inputUpBack,

	setSprites: function(self){
		for (const input in this) {
			if (this.hasOwnProperty(input) &&
				typeof directions[input] !== 'function') {
				const dir = this[input];
				
				dir.sprite = self.add.image(dir.X, dir.Y, 'downForwardArrow').setAngle(dir.spriteRotation).setScale(0.5);
			}
		}
	},

	setCursors: function(cursors){
		for (const input in this) {
			if (this.hasOwnProperty(input) &&
				typeof directions[input] !== 'function') {
				const dir = this[input];
				
				switch (dir.key) {
				case 'd':
					dir.cursors = cursors.down;
					break;
				case 'u':
					dir.cursors = cursors.up;
					break;
				case 'f':
					dir.cursors = cursors.right;
					break;
				case 'b':
					dir.cursors = cursors.left;
					break;
				case 'df':
					dir.cursors = [cursors.down, cursors.right];
					break;
				case 'db':
					dir.cursors = [cursors.down, cursors.left];
					break;
				case 'uf':
					dir.cursors = [cursors.up, cursors.right];
					break;
				case 'ub':
					dir.cursors = [cursors.up, cursors.left];
					break;
				default:
					break;
				}
			}
		}
	}
};