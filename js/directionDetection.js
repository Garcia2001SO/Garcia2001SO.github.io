//@ts-check
export function directionDetection(directions){
	//ACTIVATE INPUTS
	for (const input in directions) {
		if (directions.hasOwnProperty(input) &&
			typeof directions[input] !== 'function') {
			const dir = directions[input];

			//STRAIGHT DIRS
			if(!dir.idDiagonal){
				if(dir.cursors.isDown){
					dir.isDown = true;
					allFalse(directions, dir);
				}else{
					dir.isDown = false;
				}
			}
			
			//DIAGONAL DIRS
			if(dir.isDiagonal){
				if(dir.cursors[0].isDown && dir.cursors[1].isDown){
					dir.isDown = true;
					allFalse(directions, dir);
				}else{
					dir.isDown = false;
				}
			}
		}
	}

	//SINGLE PRESS
	for (const input in directions) {
		if (directions.hasOwnProperty(input) &&
		typeof directions[input] !== 'function') {
			const dir = directions[input];
			
			if(!dir.isDown){
				dir.intermediate = false;
			}else{
				allFalse2(directions, dir);
			}
			dir.singlePress = false;

			if(!dir.singlePress && !dir.intermediate && dir.isDown){
				dir.singlePress = true;
				dir.intermediate = true;
			}
		}
	}
	
	//------
	//PAINT
	//-----
	for (const input in directions) {
		if (directions.hasOwnProperty(input) &&
			typeof directions[input] !== 'function') {
			const dir = directions[input];
			
			if(dir.isDown){
				dir.sprite.setTintFill(0xff0000);
				// console.log('d');
			}else{
				dir.sprite.setTintFill(0x000000);
			}
		}
	}
}

function allFalse(object, expt){
	for (const key in object) {
		if (object.hasOwnProperty(key) &&
		typeof object[key] !== 'function') {
			const dir = object[key];

			if(dir !== expt){
				dir.isDown = false;
				// dir.intermediate = false;
			}
		}
	}
}
function allFalse2(object, expt){
	for (const key in object) {
		if (object.hasOwnProperty(key) &&
		typeof object[key] !== 'function') {
			const dir = object[key];

			if(dir !== expt){
				// dir.isDown = false;
				dir.intermediate = false;
			}
		}
	}
}