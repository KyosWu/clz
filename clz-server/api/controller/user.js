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
        // console.log(ctx.request.body)
        // console.log(ctx.request.body.params.pageindex)
        let pageindex = ctx.request.body.params.pageindex;
        let pagesize = ctx.request.body.params.pagesize;
        try {
            let skip = (pageindex-1)*pagesize;
            let limit = pagesize*1;
            // 取status不为0的用户，这个判断要添加
            let data = await userModel.find().skip(skip).limit(limit)
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
        console.log(paramsData)
        try {
            let data = await userModel.findOne({username: paramsData.name})
            if (data) {
                console.log('用户已存在')
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

    // 更新用户
    // 问题实现更新
    async update (ctx, next) {
        console.log('----------------更新管理员 user/update-----------------------');
        let id = ctx.request.body._id
        let name = ctx.request.body.name
        let username = ctx.request.body.username
        let pwd = ctx.request.body.pwd
        let roles = ctx.request.body.roles
        // let newPwd = md5(md5(pwd).substr(3,8)+md5(pwd))
        console.log(id,name,username,pwd,roles)
        let a = await userModel.findByIdAndUpdate({_id: id},[{name: name},{username:username}, {password : pwd},{roles: roles}]);
        ctx.body = {
            a
        }
    }

    // 需要建id字段
    async del (ctx, next) {
        console.log('----------------删除管理员 user/del-----------------------');
        console.log(ctx.request.body)
        try {
            // userModel.find({_id: id}).update({status: 0})
            await userModel.remove({_id: id}).then(()=>{
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
