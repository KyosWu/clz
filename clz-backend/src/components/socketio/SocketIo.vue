<template>
  <div>
    <el-button @click="clickButton"></el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: []
    }
  },
  mounted () {
    // 判断是否支持socketio
    var timerOne = window.setInterval(() => {
      if (this.$socket) {
        this.$socket.emit('news', 1)
        window.clearInterval(timerOne)
      }
    }, 500)
    this.$nextTick(() => {
      var _this = this
    })

    this.$socket.emit('news', 'mounted挂在了')
    this.$socket.on('news', (res) => {
      console.log('前端监听了:', res)
    })
    this.sockets.subscribe('info', (res) => {
      console.log('info前端监听了:', res)
    })
    // this.sockets.unsubscribe('EVENT_NAME')
  },
  created () {
    this.initSocket()
    this.$socket.on('info', (res) => {
      console.log(res)
    })
  },
  sockets: {
    // 监听链接
    connect: function () {
      console.log('服务器连接成功')
    },
    message (value) {
      var json_value = JSON.parse(value) // 将结果转为json格式
      this.users = []
      var _this = this
      json_value.forEach(function(item, index) {
        _this.users.push({
          'name': item.FIRST_
        })
      })
    },
    // 监听断开连接，函数
    disconnect () {
      console.log('断开服务器连接')
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  methods: {
    initSocket () { // 初始化weosocket
      this.$socket.emit('message', {}) // 向服务端发送信息
    },
    clickButton: function () {
      let data = '前端点击了'
      try {
        this.$socket.emit('news', data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
