const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const articleSchema = new Schema({
	title:String,
	time:String,
	content:String,
	original:String,
	tag: Object,
	des:String,
	list:String,
    banner: String,
    imgFileName: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: "user"
	},
	comments: {
		type: Schema.Types.ObjectId,
		ref: "comment"
	},
	status: {
		type: Number,
		default: 1
	}
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}});


module.exports = model('article',articleSchema);
