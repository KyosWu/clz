/*
* MD5 验证
*
* */

const crypto = require("crypto");

function MD5(password){
    let md5 = crypto.createHash('md5');
    return md5(md5(password).substr(3, 8) + md5(password)).digest('hex');
}


module.exports = MD5
