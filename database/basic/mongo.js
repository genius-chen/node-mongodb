const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true ,useUnifiedTopology: true}) //数据库连接
        .catch((err) => {
            console.log(err,'failed');
        })
        .then(() => {
            console.log('succeeded');
        });

const courseSchema = new mongoose.Schema({
    name:String,
    author:String,
    isPublished:Boolean
}); //创建集合规则

const Course = mongoose.model('Course',courseSchema); //创建集合构造函数
//方法1:
const course = new Course({
    name:'mongodb',
    author:'cyzm',
    isPublished:true
});//插入数据文档
course.save(); //保存

//方法2:
Course.create({
    name:'js',
    author:'cyzm',
    isPublished:true,
},(err,doc) => {
    console.log(err);
    console.log(doc);
});
//create方法返回promise对象
/* 
Course.create({
    name:'js',
    author:'cyzm',
    isPublished:true,
}).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})和前面代码一样
*/


