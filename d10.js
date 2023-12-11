const fs = require('node:fs');

fs.readFile('inputs/d10_input','utf8',(err,data)=>{
    if(err){
        console.log(err);
        return;
    }
    const lines = data.trim().split('\n');
    console.log("Part 1:",answerP1(lines));
    console.log("Part 2:",answerP2(lines));
    
});

function findS(lines){
    for(let i = 0; i < lines.length ; i++){
        for(let j = 0; j < lines[i].length ; j++){
            if(lines[i][j] == 'S'){
                return [i,j]
            }
        }
    }
    return [-1,-1];
}

function findFriends([i,j],lines){

    const friends = [];

    //up
    if(i-1 >= 0 && ['|','F','7'].includes(lines[i-1][j])){
        friends.push([i-1,j,-1,0]);
    }
    //down
    if(i+1 < lines.length && ['|','L','J'].includes(lines[i+1][j])){
        friends.push([i+1,j,1,0]);
    }
    //left
    if(j-1 >=0 && ['-','F','L'].includes(lines[i][j-1])){
        friends.push([i,j-1,0,-1]);
    }
    //right
    if(j+1 < lines[i].length && ['-','7','J'].includes(lines[i][j+1])){
        friends.push([i,j+1,0,1]);
    }

    if(friends.length > 2){
        console.log("HMMM");
    }

    return friends;
}

function nextDirection(pipe,[i,j]){
    switch(pipe){
        case '|':
            return [i,0];
        case '-':
            return [0,j];
        case 'F':
            return [-j,-i];
        case 'L':
            return [j,i];
        case 'J':
            return [-j,-i];
        case '7':
            return [j,i];
    }
}

function setStartSymbol(lines,friends,start){
    lines[start[0]] = lines[start[0]].split('');
    let [a,b,i1,j1] = friends[0];
    let [c,d,i2,j2] = friends[1];
    let s = '';
    let flag = false;
    switch(Math.abs(i2-i1)){
        case 0:
            s = '-'
            break;
        case 1:
            flag = true;
            break;
        case 2:
            s = '|'
            break;
    }
    //damn I am very lazy
    if(flag){
        let down = false;
        if(i1+i2 == 1){
            down = true;
        }
        let right = false;
        if(j1+j2 == 1){
            right = true;
        }
        if(down && right){
            s = 'F';
        }
        if(down && !right){
            s = '7';
        }
        if(!down && right){
            s = 'L';
        }
        if(!down && !right){
            s = 'J';
        }
    }

    lines[start[0]][start[1]] = s;

}

function answerP1(lines){
    const start = findS(lines);
    const friends =  findFriends(start,lines);

    //we start at a friend after all
    let distance = 1;
    let [i,j, ...d] = friends[0];

    while(i != start[0] || j != start[1]){
        const pipe = lines[i][j];        
        d = nextDirection(pipe,d);
        i = i + d[0];
        j = j + d[1];
        distance ++;
    }

    return Math.floor(distance/2);
}

function answerP2(lines){
    const start = findS(lines);
    const friends =  findFriends(start,lines);
    setStartSymbol(lines,friends,start);

    let [i,j, ...d] = friends[0];

    const loop = new Map();

    while(i != start[0] || j != start[1]){

        loop.set(`${[i,j]}`,1);
        const pipe = lines[i][j];   
        d = nextDirection(pipe,d);

        i = i + d[0];
        j = j + d[1];
    }
    //include the start
    loop.set(`${[i,j]}`,1);
    
    let area = 0;
    let inner = false;
    let s = ''

    const vertical = ['|','F','L'];
    for(let i = 0; i < lines.length; i++){
        inner = false;
        s = '';
        for(let j = 0; j < lines[i].length; j++){
            if(loop.has(`${[i,j]}`)){
                if(vertical.includes(lines[i][j])){
                    inner = !inner; 
                    s = lines[i][j];
                }else if(lines[i][j] == '7'){ //ugh F7 is two verticals up then down, FJ is upup
                    if(s != 'L') inner = !inner;
                }else if (lines[i][j] == 'J'){
                    if(s != 'F') inner = !inner;
                }
                continue;
            }
            if(inner){
                area++;
            }
        }
    }
    return area;
}