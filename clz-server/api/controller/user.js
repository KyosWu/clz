const userModel = require('../models/user');
const jwt = require('jsonwebtoken')

// jwt 配置密钥
const {secret} = require('../../config/config')
// 权限验证
const { Auth } = require('../../middleware/auth')
// ctx.body 提示状态
const { getError, getSuccess } = require('../../middleware/statusType')
// MD5验证
const { MD5 } = require('../../middleware/md5')

/* error 0 表示没有错误
*  error [1,2,...] 表示错误
*  success [1,2...] 表示成功
* */

class User {
    // 中台-登录
    async login (ctx) {
        try {
            let req = ctx.request.body
            let {username,password} = req
            // 加密后的密码
            let pwd = MD5(password)
            // 获取数据库的用户名和密码
            let data = await userModel.find({username},{_id:0}).where('status').eq(1).select('username password')
            let dataUsername = ''
            let dataPassword = ''
            for (let i in data){
                dataUsername = data[i].username
                dataPassword = data[i].password
            }
            if (dataUsername.length === 0) {
                ctx.body = {
                    msg: getError(1,'','用户名错误')
                }
            }else{
                let secretKey = secret.secretKey
                if (dataPassword === pwd) {
                    ctx.session.username = dataUsername
                    // 生成token
                    let token = Auth.setToken({dataUsername},secretKey,'1d')
                    ctx.body = {
                        token,
                        username:ctx.session.username,
                        msg: getSuccess(1,200,'登录成功')
                    }
                }else {
                    ctx.body = {
                        msg: getError('','','密码错误')
                    }
                }
            }
        }catch(e){
            ctx.body = {
                msg: getError(2,'',e)
            }
        }

    }

    // 中台-用户信息列表
    async list (ctx) {
        try {
            // 关键词
            let keyword = ctx.request.body.params.keyword;
            let pageindex = ctx.request.body.params.pageindex;
            let pagesize = ctx.request.body.params.pagesize;
            let reg = new RegExp(keyword, 'i')
            let skip = (pageindex-1)*pagesize;
            let limit = pagesize*1;
            let data = await userModel.find({
                $or: [
                    {name: { $regex: reg}},
                    {username: { $regex: reg}},
                    {roles: { $regex: reg}}
                ]
            }).skip(skip).limit(limit).where('status').eq(1)
            // 统计条数
            let total = await userModel.countDocuments({})
            ctx.body = {
                msg: getSuccess(1,200,''),
                data,
                total
            }
        }catch (e){
            ctx.body = {
                msg: getError(1,'',e)
            }
        }
    }

    // 中台-添加管理员
    async add (ctx) {
        try {
            let paramsData = ctx.request.body;
            let data = await userModel.findOne({username: paramsData.name})
            if (data) {
                ctx.body = {
                    msg: getError(1,'','已存在用户')
                }
            }else{
                // 密码加密
                let pwd = paramsData.password
                let newPwd = MD5(pwd)
                paramsData.password =newPwd
                let data = await userModel.insertMany(paramsData);
                ctx.body = {
                    msg: getSuccess(1,200,'添加成功')
                }
            }
        }catch(e) {
            ctx.body = {
                msg: getError(1,'',e)
            }
        }
    }

    // 中台-管理员更新用户
    async update (ctx) {
        try {
            let pwd = ctx.request.body.pwd
            let newPwd = MD5(pwd)
            ctx.request.body.pwd = newPwd
            let updateUser = await userModel.findByIdAndUpdate(ctx.request.body._id,ctx.request.body);
            ctx.body = {
                msg: getSuccess(1,200, '更新成功'),
                data: updateUser
            }
        } catch(e) {
            ctx.body = {
                msg: getError( 1,'',e)
            }
        }
    }

    // 根据id字段，删除用户
    async del (ctx) {
        try {
            let id = ctx.request.body.params.id
            // userModel.find({_id: id}).update({status: 0})
            await userModel.findByIdAndUpdate({_id: id},{status: -1}).then(()=>{
                ctx.body = {
                    msg: getSuccess(1,200, '删除成功')
                }
            })
        }catch(e){
            ctx.body = {
                msg: getError(1,'',e)
            }
        }
    }
}

module.exports = new User();
