const article = require('../../models/frontArticleSchema');
const db = require('../../models/commentSchema');
const config = require('../../models/commentConfigSchema');
const md5 = require('../md5');
const userModel = require('../../models/userSchema');
const geetClick = require('../../../geet/click');
/**
 * private API
 * @method insert
 * @param {object} id
 * @param {object} comments, validate
 * @return {object|null}  status
 */

class Comment {
    // 存储评论信息
    async insertComment (ctx) {
        try {
            let request = ctx.request.body;
            if (request.geetValidate) {
                let result = await new Promise((resolve) => {   // 验证码二次校验
                    geetClick.validate(ctx.session.fallback, request.geetValidate, (err, success) => {
                        if (err) {
                            resolve(err)
                        }
                        resolve(success)
                    })
                })
                if (result) {
                    if (!request.comment.pass) {
                        let {_id: id, title} = await article.findOne({"_id": request.id})
                        delete request.comment.pass
                        let json = Object.assign(request.comment, {ip: getUserIp(ctx.req)})
                        let result = await db.updateOne({id: id, title: title}, {$push: {comment: json }}, {upsert:true})
                        ctx.body = {
                            status: '0000',
                            success: 1,
                            result
                        }
                    } else {
                        let pwd = md5(md5(request.comment.pass).substr(3,8)+md5(request.comment.pass))
                        let pass = await userModel.find({password: pwd})
                        if (pass.length !== 0) {
                            let {_id: id, title} = await article.findOne({"_id": request.id})
                            delete request.comment.pass
                            let json = Object.assign(request.comment, {ip: getUserIp(ctx.req)})
                            let result = await db.updateOne({id: id, title: title}, {$push: {comment: json }}, {upsert:true})
                            ctx.body = {
                                status: '0001',
                                success: '1',
                                result
                            }
                        } else {
                            ctx.body = {
                                msg: '用户不存在，身份校验不正确',
                                success: '0',
                                status: '0004'
                            }
                        }
                    }
                } else if (!result) {
                    ctx.body = {
                        msg: '数据校验失败',
                        success: '0',
                        status: '0004'
                    }
                } else {
                    ctx.body = {
                        msg: '参数不正确',
                        success: '0',
                        status: '0004'
                    }
                }
            } else {
                ctx.body = {
                    msg: '滑动验证参数不正确，请完成滑动验证',
                    success: '0',
                    status: '0004'
                }
            }
        } catch (error) {
            ctx.body = error
        }
    }

    /**
     * private API
     * @method insert
     * @param {object} id
     * @return {object|null}  commentsLists
     */
    // 获取用户id, 用户请求的header
    getUserIp (req){
        return req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    }

    // 获取文章评论
    async articleComments (ctx) {
        try {
            let request = ctx.request.body;
            let [result] = await db.find({"id": request.id}, {__v: 0, _id: 0})
            ctx.body = {
                error: 0,
                result,
                count: result.comment.length
            }
        } catch (error) {
            ctx.body = error
        }
    }

    /**
     * private API
     * @method insert
     * @return {object|null}  comments Lists
     */

    // 中台-文章评论列表
    async commentsList (ctx) {
        try {
            let req = ctx.request.body;
            let { parseInt } = Number;
            let page = parseInt((req.page-1) * req.pageSize);
            let pageSize = parseInt(req.pageSize);
            let result = await db.find({}, {__v: 0, _id: 0}).skip(page).limit(pageSize).sort({'_id':-1});
            let count = await db.count({})
            ctx.body = {
                error: 0,
                result,
                count
            }
        } catch (error) {
            ctx.body = error
        }
    }

    // 前端网页-文章评论列表
    async articleCommentsList (ctx) {
        let id  = ctx.request.query.id
        let data = await db.find({article:id}).populate({path: 'user', select: 'avatar name'})
        let contentTotal = await db.where('content').countDocuments()
        ctx.body = {
            data,
            contentTotal
        }
    }

    // 前端网页-文章评论新增
    async articleCommentsInsert (ctx) {
        console.log(ctx.request.body.params)
        // 文章id
        let articleId = ctx.request.body.params.articleId
        let data = await db.findById({article: articleId}).insert(ctx.request.body.params)
        ctx.body = {
            k : 'aa'
        }
    }

    /**
     * private API
     * @method insert
     * @param {object} status
     * @param {object} author
     * @return {object|null}  comment config
     */

    //
    async commentConfig (ctx) {
        try {
            let request = ctx.request.body
            let result = await config.updateOne({},{$set: {status: request.status}, $addToSet:{author: request.author}}, {upsert:true});
            console.log(result)
            ctx.body = result
        } catch (error) {
            ctx.body = error
        }
    }

    /**
     * private API
     * @method insert
     * @return {object|null}  config list
     */

    async configList (ctx) {
        try {
            let [result] = await config.find({}, {_id: 0, __v: 0})
            ctx.body = {
                error: 0,
                data: result
            }
        } catch (error) {
            ctx.body = {
                error: 1,
                data: error
            }
        }
    }

    /**
     * private API
     * @method insert
     * @param {object} timestamp
     * @return {object|null}  del comment
     */

    async delComment (ctx) {
        try {
            let request = ctx.request.body
            let { parseInt } = Number;
            let result = await db.update({"id": request.id}, {$pull: {comment: {time: parseInt(request.time)}}})
            ctx.body = {
                error: 0,
                delCount: result.nModified,
                success: request.ok
            }
        } catch (error) {
            ctx.body = {
                error: 1,
                data: error
            }
        }
    }
}

module.exports = new Comment();
