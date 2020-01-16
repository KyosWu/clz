const mongoose = require('mongoose');
const article = require('../../models/article')
const db = require('../../models/commentSchema')
const user = require('../../models/user')
const config = require('../../models/commentConfigSchema')
const md5 = require('../../../middleware/md5')
const userModel = require('../../models/admin')
const geetClick = require('../../../geet/click')
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
        let id = ctx.request.body.id
        let data = await db.findById({_id: id}).select('+questioner').populate('questioner')
        ctx.body = {
            data
        }
    }

    // 创建评论
    async newCreateComments(ctx) {
        // 如果没有回复者ID，即第一次评论
        let params = ctx.request.body.params
        if(!(params.replyId)){
            // 先查找有无这个用户,没有则创建用户，同时email 唯一
            let rawId = await user.find({email:params.email}).select('_id')
            // 如果没有用户
            console.log(rawId.length)
            if( rawId.length === 0){
                // 新建用户
                await user.insertMany({username:params.username,password:params.password,email:params.email})
                let id = await user.find({email:params.email}).select('_id')
                let userId = ''
                for(let i in id){
                    userId = id[i]._id
                }
                let newUserId =  mongoose.Types.ObjectId(userId)
                await db.insertMany({commentator:newUserId,content: params.content,articleId: params.articleId})
            }
            // 有用户
            if(rawId.length === 1){
                //有用户的情况下
                let userId = ''
                for(let i in rawId){
                    userId = rawId[i]._id
                }
                let newUserId =  mongoose.Types.ObjectId(userId)
                    // 同时新建相关的评论表
                await db.insertMany({commentator: newUserId,content: params.content,articleId: params.articleId})
            }
            ctx.body = {
                e: '无replayid'
            }
        }
        if(params.replyId && params.rootCommentId){
            let newReplyId = mongoose.Types.ObjectId(params.replyId)
            // 先查找有无这个用户,没有则创建用户，同时email 唯一
            let rawId = await user.find({email:params.email}).select('_id')
            // 如果没有用户
            if( rawId.length !== 1){
                // 新建用户
                await user.insertMany({username:params.username,password:params.password,email:params.email})
                let id = await user.find({email:params.email}).select('_id')
                let userId = ''
                for(let i in id){
                    userId = id[i]._id
                }
                let newUserId =  mongoose.Types.ObjectId(userId)
                await db.insertMany({commentator: newUserId,content: params.content,articleId: params.articleId,replayTo:newReplyId,rootCommentId: params.rootCommentId})
            }
            // 有用户
            if(rawId.length === 1){
                //有用户的情况下
                let userId = ''
                for(let i in rawId){
                    userId = rawId[i]._id
                }
                let newUserId =  mongoose.Types.ObjectId(userId)
                // 同时新建相关的评论表
                await db.insertMany({commentator: newUserId,content: params.content,articleId: params.articleId,replayTo:newReplyId,rootCommentId: params.rootCommentId})
            }
            ctx.body = {
                e: '有replayid'
            }
        }
    }


    // 获取评论内容
    async newCommentsList(ctx){
        const { questionId, answerId, rootCommentId } = ctx.request.query
        // 问题id 回答者id 评论根id
        const comments = await db.find({ questionId, answerId, rootCommentId }).populate('commentator replayTo')
        ctx.body = comments
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

    // 前端-文章评论列表
    async articleCommentsList (ctx) {
        console.log(ctx.request.query)
        let articleId  = ctx.request.query.id
        let rootCommentId = ctx.request.query.rootCommentId
        // 根据文章ID 展示对应旗下的评论内容
        let data = await db.find({$or:[
                {articleId: articleId},
                {rootCommentId: rootCommentId}
            ]}).populate('commentator replayTo')
        let contentTotal = await db.where('content').countDocuments()
        ctx.body = {
            data:data,
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
