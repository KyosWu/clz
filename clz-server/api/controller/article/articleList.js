const frontArticle = require('../../models/article');
const backArticle = require('../../models/backArticleSchema');

/**
 *public API
 *@method {list | function} article list
 *@return {object} return article List API
*/
class ArticleList {
    async frontList (ctx){
        try{
            let req = ctx.request.query;
            let { parseInt } = Number;
            let page = parseInt((req.page-1) * req.pagesize);
            let pagesize = parseInt(req.pagesize);
            let front = await frontArticle.find({status:1},{__v:0,content:0,original:0}).skip(page).limit(pagesize).sort({'_id':-1});
            let frontCount = await frontArticle.count({});
            ctx.body = {
                error: 0,
                count:frontCount,
                front
            }
        }catch(e){
            //handle error
            ctx.body = {error:1,info:e}
        }
    }

    async backList (ctx) {
        try{
            let req = ctx.request.query;
            let { parseInt } = Number;
            let page = parseInt((req.page-1) * req.pagesize);
            let pagesize = parseInt(req.pagesize);
            let back = await backArticle.find({status:1},{__v:0,content:0,original:0}).skip(page).limit(pagesize).sort({'_id':-1});
            let backCount = await backArticle.count({});
            ctx.body = {
                error: 0,
                count:backCount,
                back
            }
        }catch(e){
            //handle error
            ctx.body = {error:1,info:e}
        }
    }
}

module.exports = new ArticleList();


