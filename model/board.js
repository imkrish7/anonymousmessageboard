const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
    Parent_id: String,
    Reply_text: String,
    Password: String,
    Created_on: Date,
    Bump_on: Date,
    Report:Boolean 
})


const boardSchema = new Schema({
    Board: String,
    Thread_text: String,
    Password: String,
    Report: Boolean,
    Created_on: Date,
    Bump_on: Date,
    
})

var Board = mongoose.model('Board', boardSchema);
var Reply = mongoose.model('Reply', ReplySchema);

module.exports = { Board, Reply }
