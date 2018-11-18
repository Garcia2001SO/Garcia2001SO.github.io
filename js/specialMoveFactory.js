//@ts-check
export function moveFactory(dirArray, clock){
	let timers = [];
	let buffers = [];
	dirArray.forEach(element => {
		buffers.push(false);
		timers.push(undefined);
	});
	
	function bufferLogic(number, timerDelay){
		let previous = buffers[number-1];
		previous = (number === 0) ? true : previous;

		if(dirArray[number].isDown && previous){
			buffers[number] = true;

			if(timers[number] !== undefined){
				timers[number].destroy();
			}
			timers[number] = clock.delayedCall(timerDelay, () => buffers[number] = false, [], this);
		}
	}

	function detection(button, timerDelay, sound){
		let i;
		for(i = 0; i <= dirArray.length - 1; i++){
			bufferLogic(i, timerDelay);
		}

		if(button.isDown && buffers[dirArray.length-1]){
			if(typeof sound === 'object'){
				sound.play();
			}
		}
	}
    
	return {
		detection
	};
}