const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const articleSchema = new Schema({
	title:String,
	time:String,
	content:String,
	original:String,
	des:String,
	list:String,
    banner: String,
    imgFileName: String,
    comment: []
});


module.exports = model('frontArticle',articleSchema);
