const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const weiboSchema = new Schema({
    content: String,
    original_pictures: String,
    retweet_pictures: String,
    original: Boolean,
    video_url: String,
    publish_place: String,
    publish_time: Date,
    publish_tool: String,
    up_num: Number,
    retweet_num: Number,
    comment_num: Number,
    user_id: String
});

module.exports = model('weibo',weiboSchema);
