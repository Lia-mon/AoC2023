const fs = require('node:fs');

fs.readFile('inputs/d9_input','utf8',(err,data)=>{
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
    return str.trim().split(' ').map(e=>parseInt(e));
}

function difference(nums){
    const res = [];
    for(let i = 1 ; i < nums.length ; i++){
        res.push(nums[i]-nums[i-1]);
    }
    return res;
}

function answerP1(lines){
    let sum = 0;
    for(const line of lines){
        let nums = readNums(line);

        while(!nums.every(x=>x==0)){
            sum += nums[nums.length-1];
            nums = difference(nums);
        }
    }

    return sum;
}

function answerP2(lines){
    let sum = 0;
    for(const line of lines){
        let nums = readNums(line);

        let init = [];
        while(!nums.every(x=>x==0)){
            init.push(nums[0]);
            nums = difference(nums);
        }
        //why isn't the acc on the right in reduceRight >_<
        sum += init.reduceRight((acc,x)=>x-acc,0);

    }

    return sum;
}