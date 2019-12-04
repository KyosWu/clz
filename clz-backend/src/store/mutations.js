import crypto from '.././utils/crypto'

// 定义setStorage方法
const setStorage = (key, value) => {
  if (typeof (value) === 'object') {
    value = JSON.stringify(value)
  }
  sessionStorage.setItem(key, value)
}

const mutations = {
  set_token (state, payload) {
    state.token = payload
    let payloads = crypto.getAESToken(toString(payload))
    // 存储在浏览器上面，会话级别，有安全性问题
    setStorage('token', payloads)
  }
}

export default mutations
