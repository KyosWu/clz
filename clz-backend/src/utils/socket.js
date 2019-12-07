import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
var a
var wesocket = {
  debug: true,
  connection: ''
}

function getSocket (t) {
  var socketIp = 'http://127.0.0.1/' // socket地址
  wesocket.connection = socketIp
}
getSocket()
Vue.prototype.$getSocket = getSocket
export default a
