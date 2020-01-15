const path = require('path')

// jwt 密钥生成函数
function createSecret(){
    let date = new Date()
    let num1 = Math.random()*1000
    let num2 = Math.random()*(Math.abs(num1)*num1)
    return num2 + date + num1
}

const secret = {
    secretKey: createSecret(),
    expiresIn: '1d'
}

const log = {
    logLevel: 'debug', // 指定记录的日志级别
    dir: path.resolve(__dirname, '../../logs'), // 指定日志存放的目录名
    projectName: 'blog', // 项目名，记录在日志中的项目信息
    ip: '0.0.0.0' // 默认情况下服务器 ip 地址
}

module.exports =  {
    env: process.env.NODE_ENV,
    secret,
    log,
    mongodb: {
        username: 'admin',
        pwd: 123456,
        address: 'localhost:27017',
        db: 'blog',
        port: 27017
    },
    mysql: {
        dbName: 'blog',
        host: 'localhost',
        port: 3306,
        user: 'blog123',
        password: 'blog123'
    }
}
