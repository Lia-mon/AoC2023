const fs = require('node:fs');

fs.readFile('inputs/d1_input','utf8',(err,data)=>{
    if(err){
        console.log(err);
        return;
    }

    const lines = data.trim().split('\n');
    console.log("Part 1:",answer(lines,false));
    console.log("Part 2:",answer(lines,true));
})

function answer(lines,part2){

    const isDigit = (x)=>{
        return ['0','1','2','3','4','5','6','7','8','9'].includes(x);
    }

    const strDigit = (line,i)=>{
        const digits = ['zero','one','two','three','four','five','six','seven','eight','nine'];
        for(let j = 0 ; j < digits.length ; j++){
            const digit = digits[j];
            if(line.substring(i,i+digit.length)==digit){
                return [j,digit.length-1];
            }
        }
        return [0,-1];
    }

    const number = (line)=>{
        let nums = [];
        for(let i = 0 ; i < line.length ; i++){
            if(isDigit(line[i])){
                nums.push(parseInt(line[i]));
                continue;
            }

            //Part 2
            if(part2){
                const [num,j] = strDigit(line,i);
                if(j>=0){
                    i += j-1;
                    nums.push(num);
                }
            }
            //Part2 end
        }
        return 10*nums[0] + nums[nums.length-1];
    }

    let total = 0;
    for(const line of lines){
        const x = number(line);

        total+=x;
    }

    return total;
}