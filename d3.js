const fs = require('node:fs');

fs.readFile('d3_input','utf8',(err,data)=>{
    if(err){
        console.log(err);
        return;
    }

    const lines = data.trim().split('\n');
    console.log("Part 1:",answer(lines));
    console.log("Part 2:",answerP2(lines));
});

const isDigit = (x)=>{
    return ['0','1','2','3','4','5','6','7','8','9'].includes(x);
}

//returns a [ubound,lbound,num] Array
function parseLine(line){

    const numBounds = [];
    const symPos = [];

    let num = 0;
    let running = false;
    let numBound = [];

    for(let i = 0; i < line.length ; i++){
        const s = line[i];

        if(isDigit(s)){
            num = 10*num + parseInt(s);
            if(!running){
                running = true;
                numBound = [i-1];
            }
        }else{

            if(s!='.'){
                symPos.push(i);
            }

            if(running){
                running = false;
                numBound.push(i,num);
                numBounds.push(numBound);

                num = 0;
                numBound = [];
            }
        }     
    }

    if(running){
        numBound.push(line.length-1,num);
        numBounds.push(numBound);
    }

    return {numBounds : numBounds, symbols : symPos };
}

function parseLineP2(line){

    const numBounds = [];
    const symPos = [];

    let num = 0;
    let running = false;
    let numBound = [];

    for(let i = 0; i < line.length ; i++){
        const s = line[i];

        if(isDigit(s)){
            num = 10*num + parseInt(s);
            if(!running){
                running = true;
                numBound = [i-1];
            }
        }else{

            if(s =='*'){
                symPos.push(i);
            }

            if(running){
                running = false;
                numBound.push(i,num);
                numBounds.push(numBound);

                num = 0;
                numBound = [];
            }
        }     
    }

    if(running){
        numBound.push(line.length-1,num);
        numBounds.push(numBound);
    }

    return {numBounds : numBounds, symbols : symPos };
}

function answer(lines){

    const checkNum = (numBound,symbols)=>{
        let lower = numBound[0];
        let upper = numBound[1];

        for(const sym of symbols){
            if(sym>=lower && sym <=upper){
                return true;
            }

            if(sym > upper){
                break;
            }
        }
        return false;
    }

    let prevSym = [];
    let currentSym = [];

    let prevNumBounds = [];
    let currentNumBounds = [];

    let sum = 0;

    for(const line of lines){
        const read = parseLine(line);

        currentSym = read.symbols;
        currentNumBounds = read.numBounds;

        for(const numBound of prevNumBounds){
            if(checkNum(numBound,currentSym)){
                sum += numBound[2];
            }
        }

        prevNumBounds = [];
        for(const numBound of currentNumBounds){
            if(checkNum(numBound,currentSym) || checkNum(numBound,prevSym)){
                sum += numBound[2];
            }else{
                prevNumBounds.push(numBound);
            }
        }

        prevSym = currentSym;
    }

    return sum;
}

function answerP2(lines){

    const addNum = (numBound,symbols,gearAttachments)=>{

        const lower = numBound[0];
        const upper = numBound[1];
        const num = numBound[2];

        for(const i in symbols){
            const sym = symbols[i]
            if(sym>=lower && sym <=upper){
                gearAttachments[i].push(num);
                return true;

            }

            if(sym > upper){
                break;
            }
        }

        return false;
    }

    let prevGears = [];
    let prevAttachments = [];

    let currentGears = [];
    let currentAttachments = [];

    let prevNumBounds = [];
    let currentNumBounds = [];

    let sum = 0;

    for(const line of lines){
        const read = parseLineP2(line);

        currentGears = read.symbols;
        currentNumBounds = read.numBounds;
        currentAttachments = Array(currentGears.length).fill().map(_=>[]);

        for(const numBound of prevNumBounds){
            addNum(numBound,currentGears,currentAttachments);
        }

        prevNumBounds = [];

        for(const numBound of currentNumBounds){

            if(!addNum(numBound,currentGears,currentAttachments) && 
               !addNum(numBound,prevGears,prevAttachments)){
                prevNumBounds.push(numBound);
            }
        }

        prevGears = currentGears;

        for(const attachment of prevAttachments){
            if(attachment.length == 2){
                sum += attachment[0]*attachment[1];
            }
        }

        prevAttachments = currentAttachments;
    }

    for(const attachment of prevAttachments){
        if(attachment.length == 2){
            sum += attachment[0]*attachment[1];
        }
    }

    return sum;
}