const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    title: { type: String,},
    // 描述
    description: { type: String },
    // 评论人ID
    commentator: { type: Schema.Types.ObjectId, ref: 'userC',},
    // 评论的文章id
    articleId: { type: Schema.Types.ObjectId, ref: 'article' },
    // 回复给哪个用户
    replayTo: { type: Schema.Types.ObjectId, ref: 'userC' },
    // 问题Id
    questionId: { type: String,},
    // 回答Id
    answerId: { type: String},
    // 跟评论
    rootCommentId: { type: String , required: false},
    // emoji相关
    emoji: String,
    // 评论留言内容
    content: String,
    // 腾讯云验证码相关
    ticket: String,
    ranstr: String,
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}});

module.exports = model('comment',commentSchema);
