const http = require('http');
const url = require('url');
const querystring = require('querystring');

const app = http.createServer();

//引入模块
require('./model/index.js');
const User = require('./model/user.js');


app.on('request',async (req,res) => {
    const method = req.method;
    const {pathname,query} = url.parse(req.url,true);

    if(method == 'GET') {
        if(pathname == '/list'){
            //从数据库查询数据
            let users = await User.find();
            console.log(users);
            //html字符串（不能通过访问静态页面，因为要访问数据库数据，通过变量响应给页面）
            let list = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h6>
                        <a href="/add" class="btn btn-primary">添加用户</a>
                    </h6>
                    <table class="table table-striped table-bordered">
                        <tr>
                            <td>用户名</td>
                            <td>年龄</td>
                            <td>爱好</td>
                            <td>邮箱</td>
                            <td>操作</td>
                        </tr>`;
            users.forEach(item => {
                list += `
                <tr>
				<td>${item.name}</td>
                <td>${item.age}</td>
                <td>`;
                
                item.hobbies.forEach(item => {
                    list += `
                    <span>${item}</span>
				`;
                });

                list += `</td>
                <td>${item.email}</td>
				<td>
					<a href="/delete?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
                    <a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a>
				</td>
			</tr>`;
            })

            list += `
            </table>
            </div>
        </body>
        </html>`;
            res.end(list);
        }else if (pathname == '/add'){
            let add = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>添加用户</h3>
                    <form method="post" action="/add">
                    <div class="form-group">
                        <label>用户名</label>
                        <input name="name" type="text" class="form-control" placeholder="请填写用户名">
                    </div>
                    <div class="form-group">
                        <label>密码</label>
                        <input name="password" type="password" class="form-control" placeholder="请输入密码">
                    </div>
                    <div class="form-group">
                        <label>年龄</label>
                        <input name="age"type="text" class="form-control" placeholder="请填写年龄">
                    </div>
                    <div class="form-group">
                        <label>邮箱</label>
                        <input name='email' type="email" class="form-control" placeholder="请填写邮箱">
                    </div>
                    <div class="form-group">
                        <label>请选择爱好</label>
                        <div>
                            <label class="checkbox-inline">
                            <input type="checkbox" value="足球" name="hobbies"> 足球
                            </label>
                            <label class="checkbox-inline">
                            <input type="checkbox" value="篮球" name="hobbies"> 篮球
                            </label>
                            <label class="checkbox-inline">
                            <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
                            </label>
                            <label class="checkbox-inline">
                            <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
                            </label>
                            <label class="checkbox-inline">
                            <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
                            </label>
                            <label class="checkbox-inline">
                            <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
                            </label>
                            <label class="checkbox-inline">
                            <input type="checkbox" value="烫头" name="hobbies"> 烫头
                            </label>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">添加用户</button>
                    </form>
                </div>
            </body>
            </html>`;
        res.end(add);//添加用户界面
        }else if (pathname == '/modify'){
            let user = await User.findOne({_id:query.id});//通过在list修改按钮href在url添加id，获取id来查询数据
            let hobbies = ['足球','篮球','橄榄球','敲代码','抽烟','喝酒','烫头'];
            let modify = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>修改用户</h3>
                    <form method="post" action="/modify?id=${user.id}">
                    <div class="form-group">
                        <label>用户名</label>
                        <input name="name" type="text" class="form-control" placeholder="请填写用户名" value="${user.name}">
                    </div>
                    <div class="form-group">
                        <label>密码</label>
                        <input name="password" type="password" class="form-control" placeholder="请输入密码" value="${user.password}">
                    </div>
                    <div class="form-group">
                        <label>年龄</label>
                        <input name="age"type="text" class="form-control" placeholder="请填写年龄" value="${user.age}">
                    </div>
                    <div class="form-group">
                        <label>邮箱</label>
                        <input name='email' type="email" class="form-control" placeholder="请填写邮箱" value="${user.email}">
                    </div>
                    <div class="form-group">
                        <label>请选择爱好</label>
                        <div>`
                        hobbies.forEach(item => {
                            if(user.hobbies.includes(item)){
                                modify += `<label class="checkbox-inline">
                                <input type="checkbox" value="${item}" name="hobbies" checked> ${item}
                                </label>`
                            }else{
                                modify += `<label class="checkbox-inline">
                                <input type="checkbox" value="${item}" name="hobbies"> ${item}
                                </label>`
                            }
                        })
                        modify += `</div>
                    </div>
                    <button type="submit" class="btn btn-primary" >修改用户</button>
                    </form>
                </div>
            </body>
            </html>`;
            res.end(modify)
        }else if(pathname == '/delete'){
            await User.findOneAndDelete({_id:query.id});
            res.writeHead(301,{
                location:'/list'
            });
            res.end();
        };//处理用户请求的各种路由
    }else if (method == 'POST'){
        if(pathname == '/add'){
            let formData = '';
            req.on('data',(param) => {
                formData += param;
            });//接受参数
            req.on('end',async () => {
                let user = querystring.parse(formData);
                await User.create(user);
                res.writeHead(301,{
                    location:'/list'
                });//301码代表重定向，location为跳转地址
                res.end();
            });//接受完毕
        }else if (pathname == '/modify'){
            let formData = '';
            req.on('data',(param) => {
                formData += param;
            });//接受参数
            req.on('end',async () => {
                let user = querystring.parse(formData);
                await User.updateOne({_id:query.id},user);
                res.writeHead(301,{
                    location:'/list'
                });//301码代表重定向，location为跳转地址
                res.end();
            });//接受完毕
        }
    }
    
});
app.listen(3000);