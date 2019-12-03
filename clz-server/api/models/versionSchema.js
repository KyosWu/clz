const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const versionSchema = new Schema({
	version:String,
	time:String,
	content:String
});

module.exports = model('version',versionSchema);
