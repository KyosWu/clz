const article = require('../../models/article')
const fs = require('fs')
// ctx.body 提示状态
const { getError, getSuccess } = require('../../../middleware/statusType')

class Article {

	// 添加新文章
	async insertArticle (ctx){
		try{
			let req = ctx.request.body;
			let {title,htmlContent,tag,date,des,original,radio} = req;
			// radios 等于后台字段list
			const front = await article.update({title},{$set:{title,content:htmlContent,tag:tag ,time:date,des,original,list:radio,status: 1}},{upsert:true});
			let {ok} = front;
			ctx.body = {
				error:0,
				success:ok
			}
		}catch(e){
			ctx.body = {
				error:1,
				info:e
			}
		}
	}

	// 分页获取文章
	async getArticle (ctx, next) {
		try{
			let req = ctx.request.query;
			let { parseInt } = Number;
			let page = parseInt((req.page-1) * req.pagesize);
			let pagesize = parseInt(req.pagesize);
			let list = await article.find({status:1},{__v:0,content:0,original:0,list:0}).skip(page).limit(pagesize).sort({_id:-1});
			let count = await article.count({});
			ctx.body = {
				error:0,
				count,
				list
			}
		}catch(e){
			ctx.body = {
				error:1,
				info:e
			}
		}
	}

	// 获取全部文章--暂时只根据文章标题
	async getAllArticle (ctx, next) {
		let title = ctx.request.query.title
		console.log(title)
		const data = await article.find({title: title}).where('status').gte(1)
		ctx.body = {
			data
		}
	}

	// 获取前5篇文章文章
	async getArticleSearchTopList (ctx, next) {
		console.log('-----获取前几篇文章文章-----')
		console.log(ctx.request.query.page)
		let page = parseInt(ctx.request.query.page)
		try {
			const data = await article.find({status: 1}).limit(page).sort({createdAt:1})
			ctx.body = {
				data
			}
			console.log(data)
		} catch(e) {
			ctx.body = e
		}
	}

	// 根据对应的文章id 返回匹配的文章内容
	async articleInfo (ctx, next) {
		try{
			let req = ctx.request.query;
			let {id} = req;
			let result = await article.findOne({_id:id});
			// let result = await article.findOne({_id:id}).populate('comments').populate({path:'user',select: 'avatar name'});
			let pre = await article.find({'_id':{'$lt':id}}).sort({_id: -1}).limit(1).select('_id title')
			let next = await article.find({'_id':{'$gt':id}}).sort({_id: 1}).limit(1).select('_id title')
			ctx.body = {
				error:0,
				info:result,
				pre: pre,
				next: next
			}
		}catch(e){
			ctx.body = {
				error:1,
				error:e
			}
		}
	}

	// 上传文件功能
	async uploadFile (ctx) {
		try {
			let req = ctx.req.body;
			let file = ctx.req.file;
			let path = `http://${ctx.headers.host}/uploads/${file.filename}`
			let result = await article.update({_id: req.id }, {$set: {banner: path, imgFileName:file.filename}},{upsert:true})
			ctx.status = 200
			ctx.body = {
				status: ctx.status,
				filename: file.filename,
				path,
				result
			}
		} catch (error) {
			ctx.body = error
		}
	}

	async findOneArticle (ctx) {
		try {
			let req = ctx.request.body;
			let result = await article.findOne({_id:req.id})
			ctx.body = {
				result
			}
		} catch (error) {
			ctx.body = error
		}
	}

	// 删除文章
	async deleteFile (ctx) {
		try {
			let request = ctx.request.body
			let { imgFileName } = await article.findById({_id: request.id});
			let path = `${process.cwd()}/public/uploads/${imgFileName}`;
			await fs.unlinkSync(path)
			let result = await article.update({_id: request.id }, {$unset: {banner: -1, imgFileName:-1}})
			ctx.status = 200
			ctx.body = {
				status: ctx.status,
				result
			}
		} catch (error) {
			ctx.body = error
		}
	}

	// 获取所有tag标签
	async getAllTags (ctx) {
		console.log(ctx.request.query)
		// let id = ctx.request.query.id
		let data = await article.find({}).select('tag')
		ctx.body = {
			data
		}
	}
}


module.exports = new Article()
