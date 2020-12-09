const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true ,useUnifiedTopology: true}) //数据库连接
        .catch((err) => {
            console.log(err,'failed');
        })
        .then(() => {
            console.log('succeeded');
        });

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'错误信息'] ,//该属性是否必须
        minlength:2,//针对string
        maxlength:5,
        trim:true, //去除字符串两边空格
    },
    age:{
        type:Number,
        max:20,
        min:1, //针对number
        default:1, //默认值
    },
    email:String,
    password:String,
    hobbies:[String],
    job:{
        type:String,
        enum:{
            value:['doctor','cook','teacher','student'] ,
            message:'职业错误' //自定义错误信息
        },//枚举
        validate:{
            validator:(x) => {
                //返回boolean，true验证成功，false失败，x为待验证值
                return x && x.length > 4;
            },
            //自定义错误信息
            message:'x is not matched'
        }
    },
});

const User = mongoose.model('User',userSchema);

User.find().then((result) => {
    console.log(result);    
});//返回一个数组包含所以符合搜索条件的promise对象 
User.findOne().then((result) => {
    console.log(result);
});//返回第一个符合条件的对象
/*
语法find/findOne({xxx:xxx/{$gt(>):xx,$lt(<):xx}/{$in(包含):[xx,xx]}})
*/
User.find().select('name');
//select('想查询字段');不想查询则在字段前加-
User.find().sort('age');//升序排列，降序排列加-
//skip(n)跳过n条，limit(n)，限制n条

/*
User.findOneDelate({xxx})删除第一条匹配文档，返回删除的文档对象
User.delateMany({xxx})删除多条 返回{n:xx,ok:1}
User.updateOne({xxx:xxx}（旧文档的数据）,{xxx:xxx}(新文档数据)) 跟新第一个文档,返回同上
User.updateMany({xxx:xxx},{xxx,:xxx}) 跟新多个，返回同上
ps:若是传入{},则代表选择所有
*/

