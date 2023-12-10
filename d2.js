const fs = require('node:fs');

fs.readFile('inputs/d2_input','utf8',(err,data)=>{
    if(err){
        console.log(err);
        return;
    }

    const lines = data.trim().split('\n');
    console.log("Part 1:",answerP1(lines));
    console.log("Part 2:",answerP2(lines));
})

// const maxVals = [12,13,14]; //red green blue
const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

function evaluateLine(line){
    const data = line.split(':');
    const gameNum = parseInt(data[0].slice(4));
    const hands = data[1].split(';');

    const readHand = (hand)=>{
        const colours = hand.split(',');
        let red = 0;
        let green = 0;
        let blue = 0;

        for(const colour of colours){
            const x = colour.trim().split(' ');

            let val = parseInt(x[0]);
            switch (x[1].trim()){
                case 'red':
                    red = val;
                    break;
                case 'blue':
                    blue = val;
                    break;
                case 'green':
                    green = val;
                    break;
                default:
                    console.log('sth went wrong',x[1]);
            }
        }

        return [red,green,blue];
    }

    for(const hand of hands){
        const [red,green,blue] = readHand(hand);

        if(red > maxRed || green > maxGreen || blue > maxBlue){
            return 0;
        }
    }

    return gameNum;
}

function evaluateP2(line){
    const data = line.split(':');
    const hands = data[1].split(';');

    const readHand = (hand)=>{
        const colours = hand.split(',');
        let red = 0;
        let green = 0;
        let blue = 0;

        for(const colour of colours){
            const x = colour.trim().split(' ');

            let val = parseInt(x[0]);
            switch (x[1].trim()){
                case 'red':
                    red = val;
                    break;
                case 'blue':
                    blue = val;
                    break;
                case 'green':
                    green = val;
                    break;
                default:
                    console.log('sth went wrong',x[1]);
            }
        }

        return [red,green,blue];
    }

    let mRed = 0, mBlue = 0 , mGreen = 0;
    for(const hand of hands){
        const [red,green,blue] = readHand(hand);

        if(red > mRed){
            mRed = red;
        }
        if(blue > mBlue){
            mBlue = blue;
        }
        if(green > mGreen){
            mGreen = green;
        }
    }

    return mRed * mGreen * mBlue;
}


function answerP1(lines){
    return lines.reduce((s,line)=>(s+evaluateLine(line)),0);
}

function answerP2(lines){
    return lines.reduce((s,line)=>(s+evaluateP2(line)),0);
}