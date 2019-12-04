const userModel = require('../models/userSchema');
const md5 = require('./md5');
const jwt = require('jsonwebtoken')
const conf = require('../../config/config')

/**
 *Private API
 *@method login
 *@param {String|null} username POST
 *@param {String|null} password POST
 *@return {session,info}
*/
class User {
    async login (ctx,next) {
        try{
            let req = ctx.request.body;
            let {username,password} = req;
            let pwd = md5(md5(password).substr(3,8)+md5(password));
            let result = await userModel.find({username});
            if (result.length === 0) {
                ctx.body = {
                    error:1,
                    msg:'username Error'
                }
            }else{
                let [userInfo] = result;
                let {username,password} = userInfo;
                if (password === pwd) {
                    ctx.session.username = username;
                    ctx.body = {
                        error:0,
                        success:1,
                        username:ctx.session.username
                    }
                }else {
                    ctx.body = {
                        error:2,
                        msg:'Unauthorized Password'
                    }
                }
            }
        }catch(e){
            ctx.body = {
                error:1,
                info:e
            }
        }
    }

    async info (ctx, next) {
        console.log('----------------获取用户信息接口 user/getUserInfo-----------------------');
        let token = ctx.request.query.token;
        try {
            let tokenInfo = jwt.verify(token, conf.auth.admin_secret);
            console.log(tokenInfo)
            ctx.body = {
                username: tokenInfo.username,
                name: tokenInfo.name,
                _id: tokenInfo._id,
                roles: tokenInfo.roles
            }
        }catch (e) {
            if ('TokenExpiredError' === e.name) {
                ctx.body = ('鉴权失败, 请重新登录!');
                ctx.throw(401, 'token expired,请及时本地保存数据！');
            }
            ctx.throw(401, 'invalid token');
            ctx.body('系统异常!');
        }
    }

    // 用户信息列表
    async list (ctx, next) {
        console.log('----------------获取用户信息列表接口 user/getUserList-----------------------');
        let { keyword, pageindex, pagesize} = ctx.request.query;
        console.log('keyword:'+keyword+','+'pageindex:'+pageindex +','+ 'pagesize:'+pagesize)

        try {
            let skip = (pageindex-1)*pagesize;
            let limit = pagesize*1;
            let data = await userModel.find().skip(skip).limit(limit)
            ctx.body = {
                data
            }
        }catch (e){
            console.log(e)
        }
    }

    // 添加用户
    async add (ctx, next) {
        console.log('----------------添加管理员 user/add-----------------------');
        let paramsData = ctx.request.body;
        try {
            let data = await userModel.findOne({username: paramsData.name})
            if (data) {
                console.log('数据已经存在, 请重新添加!')
                ctx.body = {
                    code: 353,
                }
            }else{
                let data = await userModel.insertMany(paramsData);
                ctx.body = {
                    code: 'LIV',
                    data
                }
            }
        }catch(e) {
            ctx.body = e
        }
    }

    async update (ctx, next) {
        console.log('----------------更新管理员 user/update-----------------------');
        let paramsData = ctx.request.body;
        console.log(paramsData)
        try {
            let data = await ctx.findOne(userModel, {name: paramsData.name})
            if (paramsData.old_pwd !== data.pwd) {
                return ctx.sendError('密码不匹配!')
            }
            delete paramsData.old_pwd
            await ctx.update(userModel, {_id: paramsData._id}, paramsData)
            ctx.send()
        }catch(e) {
            if (e === '暂无数据') {
                ctx.sendError(e)
            }
        }
    }

    async del (ctx, next) {
        console.log('----------------删除管理员 user/del-----------------------');
        let id = ctx.request.query.id
        try {
            ctx.remove(userModel, {_id: id})
            ctx.send()
        }catch(e){
            ctx.sendError(e)
        }
    }

}

module.exports = new User();
