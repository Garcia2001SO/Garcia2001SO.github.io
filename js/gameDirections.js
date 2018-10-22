let downBool = false;
let forwardBool = false;
let downForwardBool = false;

let down1PressBool = false;
let forward1PressDBool = false;
let downForward1PressBool = false;

let intermediateDownBool = false;
let intermediateForwardBool = false;
let intermediateDownForwardBool = false;

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