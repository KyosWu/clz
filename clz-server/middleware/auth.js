/*
* auth 权限验证
* */

const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level) {
        this.level = level || 1

        Auth.AUSE = 8
        Auth.ADMIN = 16
        Auth.SPUSER_ADMIN = 32
    }

    // 设置token
    static setToken (options, secret, expiresIn) {
        return jwt.sign({options}, secret, {expiresIn});
    }

}

module.exports = {
    Auth
}
