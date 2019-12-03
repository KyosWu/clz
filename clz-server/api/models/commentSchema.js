const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    id: String,
    title: String,
    comment: []
});

module.exports = model('comment',commentSchema);
