const getRouter = require('router'); //引入路由模块
const router = getRouter();//获取路由对象
const Student = require('../model/user.js');//创建集合
const template = require('art-template');
const querystring = require('querystring');

router.get('/add',(req,res) => {
    let html = template('index.art',{});
    res.end(html);
});
router.get('/list',async (req,res) => {
    let students = await Student.find();
    console.log(students);
    let list = template('list.art',{
        students:students,
    });
    res.end(list);
});
router.post('/add',(req,res) => {
    let formData = '';
    req.on('data',param => {
        formData += param;
    });
    req.on('end',async () => {
        formData = querystring.parse(formData);
        await Student.create(formData);
        res.writeHead(301,{
            location:'/list'
        });
        res.end();
    })
});
module.exports = router;