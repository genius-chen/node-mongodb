const http = require('http');
const url = require('url');
const app = http.createServer();

app.on('request',(req,res) => {
    //res.end('<h2>hello world</h2>');
    /* if (req.method == 'POST'){
        res.end('post');
    }else {
        res.end('get');
    } */
    //console.log(req.method);
    let {query, pathname}= url.parse(req.url,true);
    res.writeHead(200,{
        'content-type':'text/html;charset=utf8'
    });
    if (pathname == '/index'||pathname == '/') { 
        res.end('<h2>welcome to the homepage</h2>');
    } else if (pathname == '/list'){
        res.end('<h2>welcome to the listpage</h2>');
    } else {
        res.end('<h2>not found</h2>');
    }
});

app.listen(3000);
console.log('success');

/* 
req.method 请求方法
req.url 请求地址
req.headers 请求报文 req.headers[xxx] 具体信息
res.writeHead() 响应报文（状态码，对象）
*/