const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MEANcrud', (err) =>{
    if(!err)
        console.log('mongoDB connection OK');
    else
        console.log('Err in DB : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;