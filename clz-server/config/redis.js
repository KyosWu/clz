// 本机端口和地址
const redis = new Redis({
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    prefix: 'sam:', //存诸前缀
    ttl: 60 * 60 * 23,  //过期时间
    family: 4,
    db: 0,
    password: 123456
})

const newRedis = new Redis(redis)
module.exports = newRedis


