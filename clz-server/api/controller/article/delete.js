const frontArticle = require('../../models/frontArticleSchema');
const backArticle = require('../../models/backArticleSchema');

/**
 * private API
 * @method delArticle
 * @param {object} 接收id和list作为删除标志
 * @return {object|null}  return {n:0,ok:0}
*/

class delArticle {
	async delArticle (ctx,next) {
		try{
			let req = ctx.request.body;
			let {id,list} = req;
			let db = list === 'Front' ? frontArticle : backArticle;
			let res = await db.findByIdAndUpdate({_id:id},{status: -1});
			let {n,ok} = res;
			ctx.body = {
				del:n,
				ok: 1
			}
		}catch(e){
			ctx.body = {
				error:1,
				info:e
			};
		}
	}
}

module.exports = new delArticle();


// module.exports = {
// 	delArticle
// }
