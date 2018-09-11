//@ts-check

//This tracks and displays the most recent
//directions pressed
let directionHistory = [];

function historyBar(dis){
    
    if(directionHistory.length >= 7){
        directionHistory[0][2].destroy();
        directionHistory.shift();
        
        directionHistory.forEach(dir => {
            dir[1] -= 80;
            dir[2].setX(dir[1]);
        });
    }

    let positionX = 210 + 80 * directionHistory.length;
    
    if(down1PressBool){
        directionHistory.push(['d', positionX, dis.add.image(positionX, 550, 'downForwardArrow').setAngle(45).setScale(0.5).setTintFill(0x005aed)]);
    }
    if(downForward1PressBool){
        directionHistory.push(['df', positionX, dis.add.image(positionX, 550, 'downForwardArrow').setScale(0.5).setTintFill(0x005aed)]);
    }
    if(forward1PressDBool){
        directionHistory.push(['f',positionX, dis.add.image(positionX, 550, 'downForwardArrow').setAngle(315).setScale(0.5).setTintFill(0x005aed)]);
    }

    if(down1PressBool || downForward1PressBool || forward1PressDBool){
        console.log(directionHistory);
    }
}