// import crypto from '.././utils/crypto'

const actions = {
  setBaseInfo ({
    commit
  }, data) {
    return new Promise(resolve => {
      // commit('set_userInfo', data.userInfo)
      // 存储token
      commit('set_token', data.token)
      // 把基本信息保存在本地防止刷新之后丢失
      // let datas = crypto.getAES(toString(data))
      // sessionStorage.setItem('baseInfo', JSON.stringify(datas))
      resolve()
    })
  }
}

export default actions
