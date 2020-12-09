const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);//promisify包装readFile方法

async function run(){
    let r1 = await readFile('./1.txt','utf8');
    let r2 = await readFile('./2.txt','utf8');
    let r3 = await readFile('./3.txt','utf8');
    console.log(r1);
    console.log(r2);
    console.log(r3);
}
run();