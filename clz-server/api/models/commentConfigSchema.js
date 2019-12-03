const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const configSchema = new Schema({
    author: [],
    status: Boolean
});


module.exports = model('commentConfig',configSchema);
