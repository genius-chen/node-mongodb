const http = require('http');
const template = require('art-template');
const path = require('path');
const serveStatic = require('serve-static');//静态资源访问服务
const dateformat = require('dateformat');
const router = require('./route/index.js')

const serve = serveStatic(path.join(__dirname,'public'));//获取静态资源访问服务方法

template.defaults.root = path.join(__dirname,'views');
template.defaults.imports.dateformat = dateformat;//引入dateformat方法进template



require('./model/connect.js'); //连接服务器


const app = http.createServer();


app.on('request',(req,res) => {
    router(req,res,() => {});
    serve(req,res,() => {})
});

app.listen(80);
console.log('server has been launched');