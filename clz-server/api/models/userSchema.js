const mongoose = require('mongoose');
const { Schema, model } = mongoose;

let userSchema = new Schema({
    username:String,
    password:String
});


module.exports = model('user',userSchema);
