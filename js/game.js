//@ts-check
import { directionDetection } from './directionDetection.js';
import { historyBar } from './historyBar.js';
import { directions } from './directions.js';

export let config = {
	type: Phaser.AUTO,
	width: 1300,
	height: 700,
	backgroundColor: '#ffffff',
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

let game = new Phaser.Game(config);
let cursors;

let selector;
let barra;
let barraPercent = 100;
let barraTextObject;
let barraString = '';

let punchButton;
let messageInstructions;
let soundRythim;
let hadokenSoundSF2;
let keySpace;
let keyEnter;

let myClock;
let timer;
let timer2;
let timer3;
let timerDelay = 200;

function preload(){
	this.load.image('downForwardArrow', 'assets/diagonalRightArrowWhite.png');
	this.load.image('punchIcon', 'assets/punch.png');

	this.load.image('selector', 'assets/selector.png');
	this.load.image('barra', 'assets/barra.png');

	this.load.audio('hadokenSound', 'assets/hadouken.mp3');
}

function create(){
	//SPRITES
	directions.setSprites(this);
	
	punchButton = this.add.image(config.width/2 + 250, 300, 'punchIcon');
	barra = this.add.image(config.width/2, 100, 'barra');
	selector = this.add.image(barra.x - barra.width/2, 100, 'selector').setInteractive();

	//INPUTS
	cursors = this.input.keyboard.createCursorKeys();
	directions.setCursors(cursors);
	keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    
	//TEXT
	barraTextObject = this.add.text(420, 93, '100%', {
		color: 0xff0000
	});

	this.input.setDraggable(selector);
	this.input.on('drag', function (pointer, gameObject, dragX) {
		if(dragX >= barra.x + barra.width/2){
			dragX = barra.x + barra.width/2;
		}
		if(dragX <= barra.x - barra.width/2){
			dragX = barra.x - barra.width/2;
		}
        
		gameObject.x = dragX;
		barraPercent = ((selector.x - barra.x + barra.width/2) * 1900/352) + 100;
		barraString = barraPercent.toFixed() + '%';
	});
    
	//SOUNDS
	hadokenSoundSF2 = this.sound.add('hadokenSound');

	//TIMER
	myClock = this.time;
}

function update(){
	directionDetection(directions);

	if(keySpace.isDown){
		punchButton.tint = 0xff0000;
	}else{
		punchButton.clearTint();
	}

	if(!(barraString === '')){
		barraTextObject.setText(barraString);
		timerDelay = 200 * barraPercent / 100;
	}
    
	historyBar(directions, this);
	hadokenDetection();
}

function hadokenDetection() {    
	if(directions.inputDown.isDown){
		directions.inputDown.bufferBool = true;

		if(timer !== undefined){
			timer.destroy();
		}
		timer = myClock.delayedCall(timerDelay, function(){
			directions.inputDown.bufferBool = directions.inputDown.isDown ? true : false;
		}, [], this);
	}

	if(directions.inputDownForward.isDown && directions.inputDown.bufferBool){
		directions.inputDownForward.bufferBool = true;

		if(timer2 !== undefined){
			timer2.destroy();
		}
		timer2 = myClock.delayedCall(timerDelay, function(){
			directions.inputDownForward.bufferBool = false;
		}, [], this);
	}
        
	if(directions.inputForward.isDown && directions.inputDownForward.bufferBool){
		directions.inputForward.bufferBool = true;
        
		if(timer3 !== undefined){
			timer3.destroy();
		}
		timer3 = myClock.delayedCall(timerDelay, function(){
			directions.inputForward.bufferBool = false;
		}, [], this);
        
	}
	if(keySpace.isDown && directions.inputForward.bufferBool){
		hadokenSoundSF2.play();
	}
}