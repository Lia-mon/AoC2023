const fs = require('node:fs');

fs.readFile('inputs/d4_input','utf8',(err,data)=>{
    if(err){
        console.log(err);
        return;
    }

    const lines = data.trim().split('\n');
    // console.log(lines)
    console.log("Part 1:",answerP1(lines));
    console.log("Part 2:",answerP2(lines));
});

function parseCard(cardLine){
    const values = cardLine.split(":")[1].trim().split("|");

    const winning = [];
    const numbers = [];

    const isDigit = (x)=>{
        return ['1','2','3','4','5','6','7','8','9','0'].includes(x);
    }

    let n = 0;
    let running = false;
    for(const c of values[0]){
        if(isDigit(c)){
            running = true;
            n=10*n + parseInt(c);
        }else{
            if(running){
                winning.push(n);
                n = 0;
                running = false;
            }
        }
    }

    if(running){
        numbers.push(n);
        n = 0;
        running = false;
    }

    n=0;
    for(const c of values[1]){
        if(isDigit(c)){
            running = true;
            n=10*n + parseInt(c);
        }else{
            if(running){
                numbers.push(n);
                n = 0;
                running = false;
            }
        }
    }
    if(running){
        numbers.push(n);
        n = 0;
        running = false;
    }

    return [winning,numbers];
}

function answerP1(lines){
    let total = 0;

    for(const line of lines){
        const [winning,numbers] = parseCard(line);
        let score = 1;
        let wins = 0;
        for(const num of numbers){
            if(winning.includes(num)){
                wins ++;
            }
        }
        if(wins > 0){
            total += score<<(wins-1);
        }
        // console.log(winning,score,total)
    }

    return total;
}

function answerP2(lines){

    let total = 0;

    //max amount of wins = 10
    const followers = Array(10).fill(1);

    for(const line of lines){
        const [winning,numbers] = parseCard(line);
        let wins = 0;

        const amount = followers.shift();
        followers.push(1);
        total += amount;

        for(const num of numbers){
            if(winning.includes(num)){
                followers[wins]+=amount;
                wins ++;
            }
        }
        // console.log(followers,total)
    }
    return total;
}