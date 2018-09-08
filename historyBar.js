//This tracks and displays the most recent
//directions pressed
let directionHistory = [];

function historyBar(dis){
    let positionX = 200;

    if(down1PressBool){
        directionHistory.push('d');
    }
    if(downForward1PressBool){
        directionHistory.push('df');
    }
    if(forward1PressDBool){
        directionHistory.push('f');
    }

    if(directionHistory.length >= 1){
        directionHistory.forEach(dir => {
            if(dir === 'd'){
                dis.add.image(positionX, 550, 'downForwardArrow').setAngle(45).setScale(0.5).tint = 0x005aed;
            }
        });
    }
}