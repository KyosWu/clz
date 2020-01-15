const article = require('../../models/article');
const backArticle = require('../../models/backArticleSchema');
// ctx.body 提示状态
const { getError, getSuccess } = require('../../../middleware/statusType')

class Update {

    // 文章更新
    async update (ctx) {
        try{
            let {id} = ctx.request.query
            // let res = article.findByIdAndUpdate({_id:id},{$})
            let front = await article.find({_id:id})
            let back = await backArticle.find({_id:id})
            let arr = [...front,...back]
            ctx.body = {
                arr,
                msg: getSuccess(1,200,'更新成功')
            }
        }catch(e){
            ctx.body = {
                msg: getError(1,'',e)
            }
        }
    }

    // 更新内容
    async updateContent (ctx) {
        try{
            let req = ctx.request.body
            let {title,content,date,des,original,list,id} = req
            let front = await article.findByIdAndUpdate({_id:id},{$set:{title,content,time:date,des,original,list}})
            let back = await backArticle.findByIdAndUpdate({_id:id},{$set:{title,content,time:date,des,original,list}})
            let arr = [...front,...back]
            ctx.body = {
                arr,
                msg: getSuccess(1,200,'更新成功')
            }
        }catch(e){
            ctx.body = {
                msg: getError(1,'',e)
            }
        }
    }
}

module.exports = new Update()
