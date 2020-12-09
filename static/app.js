const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const app = http.createServer();


app.on('request',(req,res) => {
    let {pathname} = url.parse(req.url);
    let path1 = path.join(__dirname,'public' + pathname);
    fs.readFile(path1,(error,result) => {
        if (error != null){
            res.writeHead(404,{
                'content-type':'text/html;charset=utf8'
            })
            res.end('文件读取失败');
            return;
        }
        res.end(result);
    })
});

app.listen(3000);
console.log('success');