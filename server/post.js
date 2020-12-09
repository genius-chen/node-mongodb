const http = require('http');
const app = http.createServer();
const querystring = require('querystring'); //处理请求参数

app.on('request',(req,res) => {
    let postParams = '';
    req.on('data',params => {
        postParams += params;
    });
    req.on('end' ,() => {
        console.log(querystring.parse(postParams));
    });

    res.end('success')
});

app.listen(3000);
console.log('success');