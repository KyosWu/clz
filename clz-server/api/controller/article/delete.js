const frontArticle = require('../../models/article');
const backArticle = require('../../models/backArticleSchema');
// ctx.body 提示状态
const { getError, getSuccess } = require('../../../middleware/statusType')

/**
 * private API
 * @method delArticle
 * @param {object} 接收id和list作为删除标志
 * @return {object|null}  return {n:0,ok:0}
*/

class delArticle {

	// 删除文章
	async delArticle (ctx) {
		try{
			let req = ctx.request.body;
			let {id,list} = req;
			let db = list === 'Front' ? frontArticle : backArticle;
			let res = await db.findByIdAndUpdate({_id:id},{status: -1});
			let {n,ok} = res;
			ctx.body = {
				del:n,
				msg: getSuccess(1,200,'删除成功')
			}
		}catch(e){
			ctx.body = {
				msg: getError(1,'',e)
			}
		}
	}
}

module.exports = new delArticle()
