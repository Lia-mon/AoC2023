const fs = require('node:fs');

fs.readFile('d5_input','utf8',(err,data)=>{
    if(err){
        console.log(err);
        return;
    }

    const [seeds,maps] = parseInput(data);

    console.log("Part 1:",answerP1(seeds,maps));
    console.log("Part 2:",answerP2(seeds,maps));
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

function parseInput(data){
    const lines = data.split("\n");
    
    let input = readNums(lines.shift());

    const maps = [];
    let m = [];

    for(const line of lines){
        const nums = readNums(line);
        if(nums.length > 0){
            m.push(readNums(line));
        }

        if(line.includes(':')){
            if(m.length>0){
                maps.push(m);
            }
            m = [];
        }
    }
    if(m.length>0){
        maps.push(m);
    }
    // console.log(maps)
    return [input,maps];
}

function answerP1(seeds,maps){

    const asFunction = (specs)=>(num)=>{
        for(const [dr,sr,r] of specs){
            if(num>=sr && num<sr+r){
                return dr + (num-sr);
            }
        }
        return num;
    }
    
    let min = maps.reduce((acc,m)=>asFunction(m)(acc),seeds[0]);

    for(let i = 0; i<seeds.length ; i++){
        const location = maps.reduce((acc,m)=>asFunction(m)(acc),seeds[i]);
        if(location < min){
            min = location;
        }
    }
    return min;
}

function mergeSegments(seg2,seg1){
    const merged = [];
    const [d2,s2,r2] = seg2;
    let [d1,s1,r1] = seg1;
    let leftover = [];

    //seg1 endpoint below seg2
    if(d1 + r1 < s2){
        merged.push(seg1,seg2);
    }
    //seg1 endpoint is within seg2
    if(d1 + r1 <= s2 + r2){
        const hDiff = s2+r2 - (d1+r1);
        const lDiff = s2 - d1;
        if(lDiff >= 0){
            //total r2 + lDiff elements
            //seg1 is partially mapped by seg2
            merged.push([d1,s1,lDiff]);
            merged.push([d2,s1,r1-lDiff]);
            merged.push([d2+lDiff,s2+lDiff,hDiff]);
        }else{
            //total r2 elements
            //seg1 is fully mapped by seg2
            merged.push([d2,s2,-lDiff]);
            merged.push([d2-lDiff,s1,r1]);
            merged.push([d2-lDiff+r1,s2-lDiff+r1,hDiff]);
        }
    }
    if(d1 > s2+r2){
        merged.push(seg1);
    }else{
        const hDiff = (d1+r1) - (s2+r2);
        const lDiff = d1 - s2;
        merged.push([d2,s2,lDiff]);
        merged.push([d2+lDiff,s1,r1-hDiff]);
        leftover = [d1+r1-hDiff,s1+r1-hDiff,hDiff]
    }


    return [merged,leftover];
}

function answerP2(seeds,maps){
    const mix = (m2,m1)=>{
        //map2 . map1 but smart
        //each map entry represents a segment
        //the composition should have at most the total segments of m1 and m2
        //order m2 over source

        const cmp = (k)=>(a,b) =>{
            return a[k]-b[k];
        }

        const m1Sorted = m1.slice().sort(cmp(0));
        const m2Sorted = m2.slice().sort(cmp(1));

        const m = [];
        const leftover = [];

        let i = 0;
        let j = 0;
        while(i<m1Sorted.length && j < m2Sorted.length){
            let [d1,s1,r1] = m1Sorted[i];
            let [d2,s2,r2] = m2Sorted[j];
            while(d1 + r1 < s2){
                i++;
                m.push([d1,s1,r1]);
                [d1,s1,r1] = m1Sorted[i];
            }
            while(d1 > s2 + r2){
                j++;
                m.push([d2,s2,r2]);
                [d2,s2,r2] = m2Sorted[j];
            }
            if(d1 >= s2){
                const diff = s2 - d1;
                m.push([d2,s2,diff]);

                if(r2 > r1){
                    m.push([d2+diff,d1,r1]);

                    //to leftovers ? :/
                    m.push([d2+diff+r1,d1+r1,r2-r1-diff]);
                }else{
                    m.push()
                }
            }

        }

        return m;
    }

    for(let i = 0; i < seeds.length ; i+=2){
        //TOO MANY NUMBERS AAA
        for(let k =0; k< seeds[i+1]; k++){
            //gotta write the maps more effectively ; _ ;
            const location = maps.reduce((acc,f)=>f(acc),k+seeds[i]);
            if(location < min){
                min = location;
            }

        }
    }
    return min;
}