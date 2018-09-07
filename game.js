let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
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

let bufferDownBool = false;
let bufferDownForwardBool = false;
let bufferForwardBool = false;

let timer;
let timerDelay = 200;

function preload(){
    this.load.image('downArrow', 'assets/downArrowWhite.png');
    this.load.image('downForwardArrow', 'assets/diagonalRightArrowWhite.png');
    this.load.image('rightArrow', 'assets/rightArrowWhite.png');
    this.load.image('punchIcon', 'assets/punch.png');

    this.load.audio('hadokenSound', 'assets/hadouken.mp3');
}

function create(){
    //SPRITES
    arrowDown = this.add.image(150, 300, 'downArrow');
    arrowDownForward = this.add.image(300, 300, 'downForwardArrow');
    arrowForward = this.add.image(450, 300, 'rightArrow');
    punchButton = this.add.image(700, 300, 'punchIcon');

    //INPUTS
    cursors = this.input.keyboard.createCursorKeys();
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    
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
    }
        
    //FORWARD
    if(cursors.right.isDown){
        forwardBool = true;
    }else{
        forwardBool = false;
    }
    
    //DOWNFORWARD
    if(cursors.down.isDown && cursors.right.isDown){
        downBool = false;
        forwardBool = false;
        downForwardBool = true;
    }else{
        downForwardBool = false;
    }

    //ONE PRESS
    //bools that are true once per press instead of
    //every frame the button is pressed
    //DOWN
    if(!down1PressBool && downBool){
            down1PressBool = true;
            console.log('D');
    }
    if(down1PressBool && !downBool){
            down1PressBool = false;
    }

    //FORWARD
    if(!forward1PressDBool && forwardBool){
        forward1PressDBool = true;
        console.log('F');
    }
    if(forward1PressDBool && !forwardBool){
        forward1PressDBool = false;
    }

    //DOWNFORWARD
    if(!downForward1PressBool && downForwardBool){
        downForward1PressBool = true;
        console.log('DF');
    }
    if(downForward1PressBool && !downForwardBool){
        downForward1PressBool = false;
    }
    
    //------
    //GAME
    //-----
    
    //DOWN
    if(downBool){
        arrowDown.tint = 0xff0000;
        // console.log('d');
    }else{
        arrowDown.tint = 000000;
    }
    
    //FORWARD
    if(forwardBool){
        arrowForward.tint = 0xff0000;
        // console.log('f');
    }else{
        arrowForward.tint = 000000;
    }
    
    //DOWNFORWARD
    if(downForwardBool){
        arrowDownForward.tint = 0xff0000;
        // console.log('df');
    }else{
        arrowDownForward.tint = 0x000000;
    }
}