const fs = require('node:fs');

fs.readFile('d6_input','utf8',(err,data)=>{
    if(err){
        console.log(err);
        return;
    }

    const lines = data.trim().split('\n');
    // console.log(lines)
    console.log("Part 1:",answerP1(lines));
    console.log("Part 2:",answerP2(lines));
});

function readNums(str){
    const isDigit = (x)=>{
        return ['1','2','3','4','5','6','7','8','9','0'].includes(x);
    }
    const nums = [];

    let n = 0;
    let running = false;
    for(const c of str){
        if(isDigit(c)){
            running = true;
            n=10*n + parseInt(c);
        }else{
            if(running){
                nums.push(n);
                n = 0;
                running = false;
            }
        }
    }
    if(running){
        nums.push(n);
    }

    return nums;
}

//The total distance will be 
//d = u (t-u) , speed * time travelling
//set u = t/2 - a and impose u as a pos integer
//then d = (t/2-a)(t/2+a) = t^2/4 -a^2
//For some given d0 that we want to surpass it'll be
// d > d0 => a^2 < t^2/4 - d0 = a_max^2
//for odd t, a takes the values  ... -1.5,-0.5,0.5,1.5 ... half_floor(a_max) , total = 2*floor(a_max+0.5)
//for even t, a takes the values ... -1, 0, 1, ... floor(a_max), total = 2*floor(a_max) + 1
//The total values will basically be about~ 2*somefloor(a_max) :>
function possibleWins(time,distance){

    const smallerInt = (x)=>{
        if(x == 0){
            return 0;
        }

        if(Math.floor(x) == Math.ceil(x)){
            return x-1;
        }

        return Math.floor(x);
    }
    const a = Math.sqrt(time*time/4 - distance);
    if(a == 0){
        return 0;
    }

    if(time % 2 == 0){
        return 2* smallerInt(a) + 1;
    }else{
        return 2*(smallerInt(a + 0.5));
    }
}

function answerP1(lines){
    const times = readNums(lines[0]);
    const distances = readNums(lines[1]);

    let product =1;
    for(let i = 0 ; i < times.length ; i++){
        product *= possibleWins(times[i],distances[i]);
    }

    return product;
}

function answerP2(lines){
    //lazy parsing
    const time = parseInt(lines[0].split(':')[1].split('').filter(e=>e!=" ").join(''));
    const distance = parseInt(lines[1].split(':')[1].split('').filter(e=>e!=" ").join(''));

    return possibleWins(time,distance);
}