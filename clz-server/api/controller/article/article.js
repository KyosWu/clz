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
			let front = await article.update({title},{$set:{title,content:htmlContent,tag:tag ,time:date,des,original,list:radio,status: 1}},{upsert:true});
			let {ok} = front;
			ctx.body = {
				msg: getSuccess(1,200,'添加新文章成功')
			}
		}catch(e){
			ctx.body = {
				msg: getError(1,'',e)
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
				msg: getSuccess(1,200,'获取文章成功'),
				count,
				list
			}
		}catch(e){
			ctx.body = {
				msg: getError(1,'',e)
			}
		}
	}

	// 获取前5篇文章文章
	async getArticleSearchTopList (ctx) {
		console.log(ctx.request.query)
		try {
			let page = parseInt(ctx.request.query.page)
			const data = await article.find({status: 1}).limit(page).sort({createdAt:1})
			ctx.body = {
				data:data,
				msg: getSuccess(1,200,'获取文章成功')
			}
		} catch(e) {
			ctx.body = {
				msg: getError(1,'',e)
			}
		}
	}

	// 根据文章标题获取对应文章
	async getAllArticle (ctx) {
		try {
			let title = ctx.request.query.title
			let data = await article.find({title: title}).where('status').eq(1)
			let total = await article.countDocuments()
			ctx.body = {
				data:data,
				total:total,
				msg: getSuccess(1,200,'获取文章成功')
			}
		}catch(e){
			ctx.body =  {
				msg: getError(1,'',e)
			}
		}
	}

	// 根据对应的文章id 返回匹配的文章内容
	async articleInfo (ctx) {
		console.log(ctx.request.query)
		try{
			let id = ctx.request.query.id;
			let data = await article.findById({_id:id}).where('status').eq(1)
			// let result = await article.findOne({_id:id}).populate('comments').populate({path:'user',select: 'avatar name'});
			let pre = await article.find({'_id':{'$lt':id}}).sort({_id: -1}).limit(1).select('_id title')
			let next = await article.find({'_id':{'$gt':id}}).sort({_id: 1}).limit(1).select('_id title')
			ctx.body = {
				msg: getSuccess(1,200,'获取文章成功'),
				data: data,
				pre: pre,
				next: next
			}
		}catch(e){
			ctx.body = {
				msg: getError(1,'',e)
			}
		}
	}

	// 上传文件功能
	async uploadFile (ctx) {
		try {
			let req = ctx.req.body;
			let file = ctx.req.file;
			let path = `http://${ctx.headers.host}/uploads/${file.filename}`
			let data = await article.update({_id: req.id }, {$set: {banner: path, imgFileName:file.filename}},{upsert:true})
			ctx.status = 200
			ctx.body = {
				msg: getSuccess(1,200,'上传成功'),
				filename: file.filename,
				path,
				data:data
			}
		} catch (error) {
			ctx.body = {
				msg: getError(1,'',e)
			}
		}
	}

	// 查找指定文章ID
	async findOneArticle (ctx) {
		try {
			let req = ctx.request.body;
			let data = await article.findOne({_id:req.id})
			ctx.body = {
				data:data,
			}
		} catch (error) {
			ctx.body = {
				msg: getError(1,'',e)
			}
		}
	}

	// 删除文章
	async deleteFile (ctx) {
		try {
			let request = ctx.request.body
			let { imgFileName } = await article.findById({_id: request.id});
			let path = `${process.cwd()}/public/uploads/${imgFileName}`;
			await fs.unlinkSync(path)
			let data = await article.update({_id: request.id }, {$unset: {banner: -1, imgFileName:-1}})
			ctx.body = {
				msg: getSuccess(1,200,'删除成功'),
				data: data
			}
		} catch (error) {
			ctx.body = {
				msg: getError(1,'',e)
			}
		}
	}

	// 获取所有tag标签
	async getAllTags (ctx) {
		try {
			// let id = ctx.request.query.id
			let data = await article.find({}).select('tag')
			ctx.body = {
				data:data,
				msg: getSuccess(1,200,'删除成功')
			}
		}catch(e){
			ctx.body = {
				msg: getError(1,'',e)
			}
		}

	}
}


module.exports = new Article()
