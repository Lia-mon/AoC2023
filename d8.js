const fs = require('node:fs');

fs.readFile('d8_input','utf8',(err,data)=>{
    if(err){
        console.log(err);
        return;
    }

    const lines = data.trim().split('\n');
    // console.log(lines)
    console.log("Part 1:",answerP1(lines));
    console.log("Part 2:",answerP2(lines));
});

function answerP1(lines){
    let directions = lines[0];

    const map = new Map();

    for(let i = 2; i<lines.length ; i++){
        const [node,left,right] = lines[i].match(/([A-Z])\w+/g);

        map.set(node,[left,right]);

    }

    let current = 'AAA';
    let counter = 0;
    let i = 0;

    while(current!='ZZZ'){
        const s = directions[i];
        // console.log(current);
        if(s == 'L'){
            current = map.get(current)[0];
        }
        if(s == 'R'){
            current = map.get(current)[1];
        }
        counter++;
        i++;
        if(i == directions.length){
            i=0;
        }
    }
    
    // console.log(map)
    return counter;
}

function answerP2(lines){
    let directions = lines[0];

    const map = new Map();
    let current = [];

    for(let i = 2; i<lines.length ; i++){
        const [node,left,right] = lines[i].match(/([A-Z])\w+/g);
        if(node[2] == 'A'){
            current.push(node);
        }
        map.set(node,[left,right]);

    }

    const stepCount = (start)=>{
        let current = start;
        let counter = 0;
        let i = 0;

        while(current[2]!='Z'){
            const s = directions[i];
            if(s == 'L'){
                current = map.get(current)[0];
            }
            if(s == 'R'){
                current = map.get(current)[1];
            }
            counter++;
            i++;
            if(i == directions.length){
                i=0;
            }
        }

        return counter;
    }
    //correct by chance, should use BigInt here tbh
    //and now I do

    //correct by chance for another reason ; _ ;
    //if it takes X steps to get from a start to an end
    //we won't necessarily be at an(!)(doesn't have to be the same end) end after N * X steps, with N an integer.

    //if one of the paths leads inside a circular path and we're behind,there'll never be an end.
    return current.reduce((acc,x)=>lcm(acc,stepCount(x)),1n);
}

function gcd(a, b) {
    if (b == 0)
        return a;
    else
        return gcd(b, a % b);
}

function lcm(a, b) {
    b = BigInt(b)
    return (a * b) / gcd(a, b);
}