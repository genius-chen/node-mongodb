const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{useUnifiedTopology: true,useNewUrlParser: true})
    .then(() => {console.log('database linked');})
    .catch(() => {console.log('failed');});
