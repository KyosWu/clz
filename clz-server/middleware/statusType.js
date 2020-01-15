/*
* ctx.body 状态提示
*
* */

function getError(num = 1, code, msg){
    msg = {
        status:code,
        errorNum: num,
        errorMsg: msg
    }
    return msg
}

function getSuccess(num = 1, code=200, msg) {
    msg = {
        status:code,
        successNum: num,
        successMsg: msg
    }
    return msg
}

module.exports =  {
    getError,
    getSuccess
}
