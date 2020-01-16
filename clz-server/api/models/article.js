const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const article = new Schema({
	title:String,
	time:String,
	content:String,
	original:String,
	tag: Object,
	des:String,
	list:String,
    banner: String,
    imgFileName: String,
	status: {
		type: Number,
		default: 1
	}
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}});

module.exports = model('article',article);
