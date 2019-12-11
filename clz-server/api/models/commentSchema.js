const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    // 评论生成的id号
    commentsId: {
        type: String,
        index: true,
        unique: true
    },
    // 评论所在文章id
    articleId: String,
    // 创建时间，选用
    title: String,
    // 留言评论-用户名
    name: String,
    // 留言评论-用户邮箱
    email: String,
    // emoji相关
    emoji: String,
    // 评论留言内容
    content: String,
    // 腾讯云验证码相关
    ticket: String,
    ranstr: String,
    comment: []
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}});

module.exports = model('comment',commentSchema);
