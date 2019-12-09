const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const articleSchema = new Schema({
	title:String,
	time:String,
	content:String,
	original:String,
	tag: String,
	des:String,
	list:String,
    banner: String,
    imgFileName: String,
    comment: [],
	meta: {
		createdAt: {
			type: Date,
			default: Date.now()
		},
		updatedAt: {
			type: Date,
			default: Date.now()
		}
	},
});


module.exports = model('frontArticle',articleSchema);
