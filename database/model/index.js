const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true ,useUnifiedTopology: true})
    .then(() => {console.log('成功');})
    .catch(() => {console.log('失败');})//数据库连接