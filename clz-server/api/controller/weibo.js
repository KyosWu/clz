const weibo = require('../models/weibo');

/**
 * private API
 * @method insertVersion
 * @param {object} 接收发布版本参数
 * @return {object|null}  insert version number and version content
 */
class Weibo {
    async list (ctx) {
        console.log(ctx.request.body)
        let data = await weibo.find()
        ctx.body = {
            data
        }
    }

}

module.exports = new Weibo();
