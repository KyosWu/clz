const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    avatar: { type: String },
    username: { type: String },
    email: { type: String, select: false},
    // 评论表根id
    commentId: { type: Schema.Types.ObjectId, ref: 'comment'},
    // 用户状态
    status: { type: Number, default: 1, select: false }
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}});

module.exports = model('userC',userSchema);
