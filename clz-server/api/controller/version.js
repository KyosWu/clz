const versionInsert = require('../models/version');
const { getError, getSuccess } = require('../../middleware/statusType')

class Version {

	// 插入新版本
	async insertVersion (ctx) {
		try{
			let req = ctx.request.body;
			let {version,content} = req;
			let res = await versionInsert.create({
				version:version,
				time:FormatDate(new Date()),
				content:content
			})
			ctx.body = {
				msg: getSuccess(1,200, '创建成功')
			}
		}catch(e){
			//handle error
			ctx.body = {
				msg: getError(1,'', e)
			}
		}
	}

	// 获取版本
	async getVersion (ctx) {
		try{
			let data = await versionInsert.find({},{__v:0}).sort({_id:-1});
			ctx.body = {
				msg: getSuccess(1,200, ''),
				data: data
			}
		}catch(e){
			ctx.body = {
				msg: getError(1,'', e)
			}
		}
	}

	// 格式化时间
	static FormatDate (strTime) {
		var date = new Date(strTime);
		return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
	}
}

module.exports = new Version();
