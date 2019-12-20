// import {getToken} from '../../utils/auth'
import md5 from 'js-md5'
const token = localStorage.getItem('token')

const user = {
  state: {
    list: [],
    total: 0,
    name: '',
    username: '',
    roles: null,
    token: token,
    otherList: []
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USERINFO (state, info) {
      state.name = info.name
      state.username = info.username
      state.roles = info.roles
    },
    USERLIST (state, data) {
      state.list = data.data
      state.total = data.data.length
    },
    GET_INFOLIST (state, data) {
      state.otherList = data
    },
    CLEARINFO (state) {
      state.name = ''
      state.username = ''
      state.roles = null
    }
  },
  actions: {
    clearInfo ({commit}) {
      commit('CLEARINFO')
    },

    getUserInfo ({state, commit}) {
      return new Promise((resolve, reject) => {
        this.$axios.get('/user/info', {
          token: state.token
        }).then(res => {
          console.log(res)
          commit('SET_USERINFO', res.data)
          resolve(res)
        }).catch(err => {
          // console.logs(err)
          reject(err)
        })
      })
    },
    getUserList ({commit}, params) {
      return new Promise((resolve, reject) => {
        this.$axios.post('/user/list', params).then(res => {
          commit('USERLIST', res.data)
          resolve(res)
        }).catch(err => {
          // console.logs(err)
          reject(err)
        })
      })
    },
    addUser ({commit}, info) {
      info.pwd = md5(info.pwd)
      return new Promise((resolve, reject) => {
        this.$axios.post('/user/add', info)
          .then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    },
    delUser ({commit}, id) {
      return new Promise((resolve, reject) => {
        this.$axios.get('/user/del', {id: id})
          .then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    },
    updateUser ({commit}, info) {
      info.pwd = md5(info.pwd)
      info.old_pwd = md5(info.old_pwd)
      return new Promise((resolve, reject) => {
        this.$axios.post('/user/update', info)
          .then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default user
