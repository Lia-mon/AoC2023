const fs = require('node:fs');

fs.readFile('inputs/d11_input','utf8',(err,data)=>{
    if(err){
        console.log(err);
        return;
    }
    const lines = data.trim().split('\n');
    console.log("Part 1:",answerP1(lines));
    console.log("Part 2:",answerP2(lines));
    
});

function answerP1(lines){
    const expRows = [];
    const expCols = [];

    const calcDistance = (dy,dx,points)=>{
        return points.reduce((acc,[y,x])=>acc+Math.abs(dy-y)+Math.abs(dx-x),0);
    }

    for(let i = 0; i < lines.length ; i++){
        if(!lines[i].includes('#')){
            expRows.push(i);
        }
    }

    for(let j = 0; j < lines[0].length ; j++){
        let exp = true;
        for(let i = 0; i < lines.length ;i++){
            if(lines[i][j] == '#'){
                exp = false;
                break;
            }
        }
        if(exp){
            expCols.push(j);
        }
    }

    let dx = 0;
    let dy = 0;
    let s = 0;

    const points = [];
    for(let i = 0; i < lines.length ; i++){
        if(expRows.includes(i)){
            dy++;
        }
        dx = 0;
        for(let j = 0; j < lines.length ; j++){
            if(expCols.includes(j)){
                dx++;
            }
            if(lines[i][j] == '#'){
                s += calcDistance(dy,dx,points);
                points.push([dy,dx]);
            }
            dx++;
        }
        dy++;
    }
    return s;
}


//didn't need BigInt
function answerP2(lines){
    const expRows = [];
    const expCols = [];

    const calcDistance = (dy,dx,points)=>{
        const bigAbs=(a)=>(a > 0n ? a : -a);
        return points.reduce((acc,[y,x])=>acc+bigAbs(dy-y)+bigAbs(dx-x),0n);
    }

    for(let i = 0; i < lines.length ; i++){
        if(!lines[i].includes('#')){
            expRows.push(i);
        }
    }

    for(let j = 0; j < lines[0].length ; j++){
        let exp = true;
        for(let i = 0; i < lines.length ;i++){
            if(lines[i][j] == '#'){
                exp = false;
                break;
            }
        }
        if(exp){
            expCols.push(j);
        }
    }

    let dx = 0n;
    let dy = 0n;
    let s = 0n;

    const points = [];
    for(let i = 0; i < lines.length ; i++){
        if(expRows.includes(i)){
            dy+=1_000_000n-1n;
        }
        dx = 0n;
        for(let j = 0; j < lines.length ; j++){
            if(expCols.includes(j)){
                dx+=1_000_000n-1n;
            }
            if(lines[i][j] == '#'){
                s += calcDistance(dy,dx,points);
                points.push([dy,dx]);
            }
            dx++;
        }
        dy++;
    }
    return s;
}
