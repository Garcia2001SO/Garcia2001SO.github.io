//@ts-check

let config = {
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

let arrowDown;
let arrowDownForward;
let arrowForward;
let punchButton;
let selector;
let barra;
let barraPercent = 100;

let barraTextObject;
let barraString = '';
let messageInstructions;
let soundRythim;
let hadokenSoundSF2;
let cursors;
let keys;
let keySpace;
let keyEnter;

let myClock;
let timer;
let timer2;
let timer3;
let timerDelay = 200;
let timeConfig = {
    delay: 3000,
    callback: function(){
        bufferDownBool = downBool ? true : false;
        console.log('L');
    }
}

let bufferDownBool = false;
let bufferForwardBool = false;
let bufferDownForwardBool = false;

function preload(){
    this.load.image('downForwardArrow', 'assets/diagonalRightArrowWhite.png');
    this.load.image('punchIcon', 'assets/punch.png');

    this.load.image('selector', 'assets/selector.png');
    this.load.image('barra', 'assets/barra.png');

    this.load.audio('hadokenSound', 'assets/hadouken.mp3');
}

function create(){
    //SPRITES
    arrowDown = this.add.image(config.width/2 - 300, 300, 'downForwardArrow').setAngle(45);
    arrowDownForward = this.add.image(config.width/2 - 150, 300, 'downForwardArrow');
    arrowForward = this.add.image(config.width/2, 300, 'downForwardArrow').setAngle(315);
    punchButton = this.add.image(config.width/2 + 250, 300, 'punchIcon');
    barra = this.add.image(config.width/2, 100, 'barra');
    selector = this.add.image(barra.x - barra.width/2, 100, 'selector').setInteractive();

    //INPUTS
    cursors = this.input.keyboard.createCursorKeys();
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
    gameDirections();

    if(keySpace.isDown || keyEnter.isDown){
        punchButton.tint = 0xff0000;
    }else{
        punchButton.clearTint();
    }

    if(!(barraString === '')){
        barraTextObject.setText(barraString);
        timerDelay = 200 * barraPercent / 100;
    }
    
    historyBar(this);
    hadokenDetection();
}

function hadokenDetection() {    
    if(downBool){
        bufferDownBool = true;

        if(timer !== undefined){
            timer.destroy();
        }
        timer = myClock.delayedCall(timerDelay, function(){
            bufferDownBool = downBool ? true : false;
            console.log('L');
        }, [], this);
    }

    if(downForwardBool && bufferDownBool){
        bufferDownForwardBool = true;

        if(timer2 !== undefined){
            timer2.destroy();
        }
        timer2 = myClock.delayedCall(timerDelay, function(){
            bufferDownForwardBool = false;
        }, [], this);
    }
        
    if(forwardBool && bufferDownForwardBool){
        bufferForwardBool = true;
        
        if(timer3 !== undefined){
            timer3.destroy();
        }
        timer3 = myClock.delayedCall(timerDelay, function(){
            bufferForwardBool = false;
        }, [], this);
        
    }
    if(keySpace.isDown && bufferForwardBool){
        hadokenSoundSF2.play();
    }
}