const mongoose = require('mongoose');
// 导入配置信息
const conf = require('./config')

// 定义mongodb url
const db_url = `mongodb://${conf.mongodb.username}:${conf.mongodb.pwd}@${conf.mongodb.address}/${conf.mongodb.db}`;
// 定义颜色类型 导入chalk库
const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

// 连接
mongoose.Promise = global.Promise
mongoose.connect(db_url, {useNewUrlParser: true}, err => {
	if (err) {
		console.log(error("数据库连接失败！"))
		console.log(error(err))
	}else{
		console.log(success("数据库连接成功！"))
	}
})

module.exports = mongoose;
