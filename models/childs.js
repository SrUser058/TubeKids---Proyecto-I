const mongoose = require('mongoose');

const childs = new mongoose.Schema({
    name : {type : String},
    age : {type : Number},
    pin : {type : Number},
    playlist : {type : Array},
    father : {type : mongoose.ObjectId,
    ref : 'Father'},
    avatar : {type : Number}
});

module.exports = mongoose.model('Childs', childs);