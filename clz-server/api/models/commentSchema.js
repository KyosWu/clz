const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const childSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    // 外键 - 评论的文章id
    article: {
        type: Schema.Types.ObjectId,
        ref: "frontArticle"
    },
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
    createdTime: Date
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}});


const commentSchema = new Schema({
    // 评论生成的id号
    // commentsId: {
    //     type: String,
    //     index: true,
    //     unique: true
    // },
    // 外键 - 评论用户的id
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    // 外键 - 评论的文章id
    article: {
        type: Schema.Types.ObjectId,
        ref: "frontArticle"
    },
    children: childSchema,
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
    createdTime: Date
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}});

module.exports = model('comment',commentSchema);
