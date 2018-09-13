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

let downBool = false;
let forwardBool = false;
let downForwardBool = false;

let down1PressBool = false;
let forward1PressDBool = false;
let downForward1PressBool = false;

let intermediateDownBool = false;
let intermediateForwardBool = false;
let intermediateDownForwardBool = false;

let bufferDownBool = false;
let bufferForwardBool = false;
let bufferDownForwardBool = false;

let timer;
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
    timer = this.time;
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
    
    bufferDownBool = downBool ? true : bufferDownBool;
    bufferDownForwardBool = downForwardBool ? true : bufferDownForwardBool;
    bufferForwardBool = forwardBool ? true : bufferForwardBool;

    if(bufferDownBool){
        timer.delayedCall(timerDelay, function(){
            bufferDownBool = false;
        }, [], this);

        if(bufferDownForwardBool){
            timer.delayedCall(timerDelay, function(){
                bufferDownForwardBool = false;
            }, [], this);
            
            if(bufferForwardBool){
                timer.delayedCall(timerDelay, function(){
                    bufferForwardBool = false;
                }, [], this);
                
                if(keySpace.isDown){
                    hadokenSoundSF2.play();
                }
            }
        }
    }
}

function gameDirections(){
    //----------
    //KEYBOARD
    //---------
    
    //DOWN
    if(cursors.down.isDown){
        downBool = true;
    }else{
        downBool = false;
        intermediateDownBool = false;
    }
        
    //FORWARD
    if(cursors.right.isDown){
        forwardBool = true;
    }else{
        forwardBool = false;
        intermediateForwardBool = false;
    }
    
    //DOWNFORWARD
    if(cursors.down.isDown && cursors.right.isDown){
        downBool = false;
        forwardBool = false;
        downForwardBool = true;

        intermediateDownBool = false;
        intermediateForwardBool = false
    }else{
        downForwardBool = false;
        intermediateDownForwardBool = false;
    }

    //ONE PRESS
    //bools that are true once per press instead of
    //every frame the button is pressed
    //DOWN
    if((down1PressBool && intermediateDownBool && downBool) ||
       (down1PressBool && !intermediateDownBool && !downBool)){
        down1PressBool = false;
        // console.log('2');
    }
    if(!down1PressBool && !intermediateDownBool && downBool){
        down1PressBool = true;
        intermediateDownBool = true;
        // console.log('D');
    }
    
    //FORWARD
    if((forward1PressDBool && intermediateForwardBool && forwardBool) ||
       (forward1PressDBool && !intermediateForwardBool && !forwardBool)){
        forward1PressDBool = false;
    }
    if(!forward1PressDBool && !intermediateForwardBool && forwardBool){
        forward1PressDBool = true;
        intermediateForwardBool = true;
        // console.log('F')
    }

    //DOWNFORWARD
    if((downForward1PressBool && intermediateDownForwardBool && downForwardBool) ||
       (downForward1PressBool && !intermediateDownForwardBool && !downForwardBool)){
        downForward1PressBool = false;
    }
    if(!downForward1PressBool && !intermediateDownForwardBool && downForwardBool){
        downForward1PressBool = true;
        intermediateDownForwardBool = true;
        // console.log('DF');
    }
    
    //------
    //GAME
    //-----
    
    //DOWN
    if(downBool){
        arrowDown.setTintFill(0xff0000);
        // console.log('d');
    }else{
        arrowDown.setTintFill(0x000000);
    }
    
    //FORWARD
    if(forwardBool){
        arrowForward.setTintFill(0xff0000);
        // console.log('f');
    }else{
        arrowForward.setTintFill(0x000000);
    }
    
    //DOWNFORWARD
    if(downForwardBool){
        arrowDownForward.setTintFill(0xff0000);
        // console.log('df');
    }else{
        arrowDownForward.setTintFill(0x000000);
    }
}