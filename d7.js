const fs = require('node:fs');

fs.readFile('inputs/d7_input','utf8',(err,data)=>{
    if(err){
        console.log(err);
        return;
    }

    const lines = data.trim().split('\n');
    // console.log(lines)
    console.log("Part 1:",answerP1(lines));
    console.log("Part 2:",answerP2(lines));
});

function parseHand(line){
    const cards = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
    const counters = Array(13).fill(0);

    const hand = line.split(' ')[0];
    const bid = parseInt(line.split(' ')[1]);

    let val = 0;
    let type = 0;

    for(const s of hand){
        const i = cards.indexOf(s);
        val = 13*val + i;
        counters[i]++;
    }

    for(const counter of counters){
        //so lazy :D
        if(counter ==1){
            type += 1;
        }

        if(counter == 2){
            type += 10;
        }

        if(counter == 3){
            type += 100;
        }

        if(counter == 4){
            type += 1000;
        }

        if(counter == 5){
            type += 10000;
        }

    }

    return [type,val,bid];
}

function parseHandP2(line){
    const cards = ['J','2','3','4','5','6','7','8','9','T','Q','K','A'];
    const counters = Array(13).fill(0);

    const hand = line.split(' ')[0];
    const bid = parseInt(line.split(' ')[1]);

    let val = 0;
    let type = 0;

    for(const s of hand){
        const i = cards.indexOf(s);
        val = 13*val + i;
        counters[i]++;
    }
    const jokers = counters[0];

    for(let i = 1; i < counters.length ; i++){
        let counter = counters[i];

        if(counter ==1){
            type += 1;
        }

        if(counter == 2){
            type += 10;
        }

        if(counter == 3){
            type += 100;
        }

        if(counter == 4){
            type += 1000;
        }

        if(counter == 5){
            type += 10000;
        }

    }

    if(jokers > 0){
        if(type >= 1000){
            type = 10000;
        }
        else if(type >= 100){
            type = (type-100) + 100*Math.pow(10,jokers);
        }
        else if(type >= 10){
            type = (type-10) + 10*Math.pow(10,jokers);
        }else if(type >= 1){
            type = (type-1) + Math.pow(10,jokers);
        }else{
            type = 10000;
        }
    }

    return [type,val,bid];
}


function answerP1(lines){
    let sum = 0;
    const cmp = (a,b)=>{
        if(a[0] == b[0]) {
            return a[1]-b[1];
        }
        return a[0] - b[0];
    }

    const rankedHands = lines.map(e=>parseHand(e)).sort(cmp);

    for(let i = 0; i < rankedHands.length ; i++){
        sum += (i+1)*rankedHands[i][2];
    }

    return sum;
}

function answerP2(lines){
    let sum = 0;
    const cmp = (a,b)=>{
        if(a[0] == b[0]) {
            return a[1]-b[1];
        }
        return a[0] - b[0];
    }

    const rankedHands = lines.map(e=>parseHandP2(e)).sort(cmp);

    for(let i = 0; i < rankedHands.length ; i++){
        sum += (i+1)*rankedHands[i][2];
    }

    return sum;
}