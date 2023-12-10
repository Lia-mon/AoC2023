const fs = require('node:fs');

fs.readFile('d1_input','utf8',(err,data)=>{
    if(err){
        console.log(err);
        return;
    }

    const lines = data.trim().split('\n');
    console.log(answer1(lines));
})

function answer1(lines){

    const isDigit = (x)=>{
        return ['0','1','2','3','4','5','6','7','8','9'].includes(x);
    }

    const strDigit = (line,i)=>{
        const digits = ['zero','one','two','three','four','five','six','seven','eight','nine'];
        for(let j = 0 ; j < digits.length ; j++){
            const digit = digits[j];
            //const x = line.substring(i,i+digit.length).indexOf(digit);
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
            const [num,j] = strDigit(line,i);
            if(j>=0){
                i += j-1;
                nums.push(num);
            }
            //Part2 end
        }
        // console.log(nums)
        return 10*nums[0] + nums[nums.length-1];
    }

    let total = 0;
    for(const line of lines){
        const x = number(line);
        // console.log(x,total);
        total+=x;
    }

    return total;
}