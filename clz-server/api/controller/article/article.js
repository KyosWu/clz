const frontArticle = require('../../models/frontArticleSchema');
const backArticle = require('../../models/backArticleSchema');
const fs = require('fs');
/**
 * private API
 * @method insert
 * @param {object} 接收发布文章接口传递对象值
 * @return {object|null}  insert Front article
*/

class Article {
	// 添加新文章
	async insertArticle (ctx){
		try{
			let req = ctx.request.body;
			let {title,htmlContent,date,des,original,radio} = req;
			// radios 等于后台字段list
			const front = await frontArticle.update({title},{$set:{title,content:htmlContent,time:date,des,original,list:radio,status: 1}},{upsert:true});
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

	/**
	 *public API
	 *@param {number|null} page
	 *@param {number|null} pagesize
	 *@return {object} return article list 按时间排序
	 */

	// 分页获取文章
	async getArticle (ctx, next) {
		try{
			let req = ctx.request.query;
			let { parseInt } = Number;
			let page = parseInt((req.page-1) * req.pagesize);
			let pagesize = parseInt(req.pagesize);
			let list = await frontArticle.find({status:1},{__v:0,content:0,original:0,list:0}).skip(page).limit(pagesize).sort({_id:-1});
			let count = await frontArticle.count({});
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
		const data = await frontArticle.find({title: title}).where('status').gte(1)
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
			const data = await frontArticle.find({status: 1}).limit(page).sort({createdAt:1})
			ctx.body = {
				data
			}
			console.log(data)
		} catch(e) {
			ctx.body = e
		}
	}

	/**
	 *public API
	 *@param {String} id find Article Detail
	 *@return {object|null} return Article Detail
	 */

	// 根据对应的文章id 返回匹配的文章内容
	async articleInfo (ctx, next) {
		try{
			let req = ctx.request.query;
			let {id} = req;
			let result = await frontArticle.findOne({_id:id});
			// let result = await frontArticle.findOne({_id:id}).populate('comments').populate({path:'user',select: 'avatar name'});
			let pre = await frontArticle.find({'_id':{'$lt':id}}).sort({_id: -1}).limit(1).select('_id title')
			let next = await frontArticle.find({'_id':{'$gt':id}}).sort({_id: 1}).limit(1).select('_id title')
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

	/**
	 *private API
	 *@param {string|null} id
	 *@param {string|null} radio
	 *@return {object} return upload list
	 */

	// 上传文件功能
	async uploadFile (ctx) {
		try {
			let req = ctx.req.body;
			let file = ctx.req.file;
			let db = await Object.is(req.radio, 'Front') ? frontArticle : backArticle
			let path = `http://${ctx.headers.host}/uploads/${file.filename}`
			let result = await db.update({_id: req.id }, {$set: {banner: path, imgFileName:file.filename}},{upsert:true})
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
			let db = await Object.is(req.radio, 'Front') ? frontArticle : backArticle
			let result = await db.findOne({_id:req.id})
			ctx.body = {
				error:0,
				result
			}
		} catch (error) {
			ctx.body = {
				error: 1,
				error: e
			}
		}
	}
	/**
	 *private API
	 *@param {string|null} id
	 *@param {string|null} radio
	 *@return {object} return deleteFile
	 */
	// 删除文章
	async deleteFile (ctx) {
		try {
			let request = ctx.request.body
			let db = await Object.is(request.radio, 'Front') ? frontArticle : backArticle
			let { imgFileName } = await db.findById({_id: request.id});
			let path = `${process.cwd()}/public/uploads/${imgFileName}`;
			await fs.unlinkSync(path)
			let result = await db.update({_id: request.id }, {$unset: {banner: -1, imgFileName:-1}})
			ctx.status = 200
			ctx.body = {
				status: ctx.status,
				result
			}
		} catch (error) {
			ctx.body = error
		}
	}

}


module.exports = new Article()
