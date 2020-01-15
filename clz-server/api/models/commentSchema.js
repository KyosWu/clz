const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    title: { type: String, required: true },
    // 描述
    description: { type: String },
    // 外键 - 评论用户的id
    questioner: { type: Schema.Types.ObjectId, ref: 'user', required: true, select: false },
    // 评论人ID
    commentator: { type: Schema.Types.ObjectId, ref: 'user', required: true},
    // 问题Id
    questionId: { type: String, required: true },
    // 回答Id
    answerId: { type: String, required: true },
    // 跟评论
    rootCommentId: { type: String , required: false},
    // 回复给哪个用户
    replayTo: { type: Schema.Types.ObjectId, ref: 'user' },
    // 外键 - 评论的文章id
    article: {
        type: Schema.Types.ObjectId,
        ref: 'frontArticle'
    },
    // 创建时间，选用

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
