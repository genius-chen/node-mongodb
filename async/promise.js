const fs = require('fs');
const { resolve } = require('path');

let promise = new Promise((resolve,reject) => {
    fs.readFile('./100.txt','utf8',(err,result) => {
        if(err != null) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});

promise.then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

//promise 解决回调地狱
/* 
function p1() {
    return new Promise ((resolve,reject) => {
        fs.readFile('./1.txt','utf8',(err,result) => {
            resolve(result);
        });
    });
};
function p2() {
    return new Promise ((resolve,reject) => {
        fs.readFile('./2.txt','utf8',(err,result) => {
            resolve(result);
        });
    });
};
function p3() {
    return new Promise ((resolve,reject) => {
        fs.readFile('./3.txt','utf8',(err,result) => {
            resolve(result);
        });
    });
};
p1().then((r1) => {
    console.log(r1);
    return p2();
}).then((r2) => {
    console.log(r2);
    return p3();
}).then((r3) => {
    console.log(r3);
});
*/
