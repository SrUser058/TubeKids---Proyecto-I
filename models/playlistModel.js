const mongoose = require('mongoose');

const Playlist = new mongoose.Schema({
    name : {type : String},
    father : {type : mongoose.ObjectId,
        ref : 'Father'},
    videos : {type : {}}
});

module.exports = mongoose.model('Playlist',Playlist)