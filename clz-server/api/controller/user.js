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
    // 用户登录
    async login (ctx,next) {
        try{
            let req = ctx.request.body
            let {username,password} = req
            let pwd = md5(md5(password).substr(3,8)+md5(password))
            let result = await userModel.find({username}).where('status').gte(1)
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
        let keyword = ctx.request.body.params.keyword;
        let pageindex = ctx.request.body.params.pageindex;
        let pagesize = ctx.request.body.params.pagesize;
        try {
            let reg = new RegExp(keyword, 'i')
            let skip = (pageindex-1)*pagesize;
            let limit = pagesize*1;
            let data = await userModel.find({
                $or: [
                    {name: { $regex: reg}},
                    {username: { $regex: reg}},
                    {roles: { $regex: reg}}
                ]
            }).skip(skip).limit(limit).where('status').gte(1)
            // 统计条数
            let total = await userModel.countDocuments({})
            ctx.body = {
                data,
                total
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
                console.log('用户已存在')
                ctx.body = {
                    code: 353,
                }
            }else{
                // 密码加密
                let pwd = paramsData.password
                let newPwd = md5(md5(pwd).substr(3,8)+md5(pwd))
                paramsData.password =newPwd
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

    // 更新用户
    async update (ctx, next) {
        console.log('----------------更新管理员 user/update-----------------------');
        let pwd = ctx.request.body.pwd
        let newPwd = md5(md5(pwd).substr(3,8)+md5(pwd))
        ctx.request.body.pwd = newPwd
        try {
            let updateUser = await userModel.findByIdAndUpdate(ctx.request.body._id,ctx.request.body);
            ctx.body = {
                updateUser
            }
        } catch(e) {
            ctx.throw(353, e)
        }

    }

    // 根据id字段，删除用户
    async del (ctx, next) {
        console.log('----------------删除管理员 user/del-----------------------');
        let id = ctx.request.body.params.id
        try {
            // userModel.find({_id: id}).update({status: 0})
            await userModel.findByIdAndUpdate({_id: id},{status: -1}).then(()=>{
                ctx.body = {
                    code: '615'
                }
            })
        }catch(e){
            ctx.body = e
        }
    }

}

module.exports = new User();
