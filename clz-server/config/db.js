const mongoose = require('mongoose');
const conf = require('./config')
// 172.26.4.181:27017
const db_url = `mongodb://${conf.mongodb.username}:${conf.mongodb.pwd}@${conf.mongodb.address}/${conf.mongodb.db}`;
const db = mongoose.createConnection(db_url);
const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

db.once('open',(callback)=>{
	console.log(success('数据库连接成功'));
});

db.on('error',(callback)=>{
	console.log(error('数据库连接失败'));
});

/**
 * private
 * 封装连接数据库
*/

module.exports = db;
