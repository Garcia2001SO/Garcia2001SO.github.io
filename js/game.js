//@ts-check
import { directionDetection } from './directionDetection.js';
import { historyBar } from './historyBar.js';
import { directions } from './directions.js';
import { moveFactory } from './specialMoveFactory.js';

export const config = {
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
let shoryukenSoundSF2;
let tatsuSoundSF2;
let keySpace;
let keyEnter;

export let myClock;
export let timerDelay = 200;

//moves
let hadouken;
let tatsu;
let shoryuken;

function preload(){
	this.load.image('downForwardArrow', 'assets/diagonalRightArrowWhite.png');
	this.load.image('punchIcon', 'assets/punch.png');

	this.load.image('selector', 'assets/selector.png');
	this.load.image('barra', 'assets/barra.png');

	this.load.audio('hadokenSound', 'assets/hadouken.mp3');
	this.load.audio('shoryukenSound', 'assets/shoryuken.mp3');
	this.load.audio('tatsuSound', 'assets/tatsu.mp3');
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
	shoryukenSoundSF2 = this.sound.add('shoryukenSound');
	tatsuSoundSF2 = this.sound.add('tatsuSound');

	//TIMER
	myClock = this.time;

	//MOVES
	let dirs = [directions.inputDown, directions.inputDownBack, directions.inputBack];
	tatsu = moveFactory(dirs, myClock);
	dirs = [directions.inputDown, directions.inputDownForward, directions.inputForward];
	hadouken = moveFactory(dirs, myClock);
	dirs = [directions.inputForward, directions.inputDown, directions.inputDownForward];
	shoryuken = moveFactory(dirs, myClock);
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

	hadouken.detection(keySpace, timerDelay, hadokenSoundSF2);
	shoryuken.detection(keySpace, timerDelay, shoryukenSoundSF2);
	tatsu.detection(keySpace, timerDelay, tatsuSoundSF2);
}