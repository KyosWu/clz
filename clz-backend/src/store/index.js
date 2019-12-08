// 此页面保持es5写法
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'
// import app from './modules/app'
import user from './modules/user'
// import permission from './modules/permission'
// import blog from './modules/blog'
// import markdown from './modules/markdown'
import socket from './modules/socket'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user,
    socket
  }
})

export default store
