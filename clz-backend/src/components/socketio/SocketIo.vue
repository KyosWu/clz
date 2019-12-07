<template>
  <div>
    <el-button @click="clickButton"></el-button>
  </div>
</template>

<script>
export default {
  mounted () {
    // var timerOne = window.setInterval(() => {
    //   if (this.$socket) {
    //     this.$socket.emit('news', 1)
    //     window.clearInterval(timerOne)
    //   }
    // }, 500)
    let data = 123
    this.$socket.emit('news', data)
    this.$socket.on('news', (res) => {
      console.log(res)
    })
  },
  sockets: {
    // 监听链接
    connect: function () {
      console.log('服务器连接成功')
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
    clickButton: function () {
      let data = '点击了'
      try {
        this.$socket.emit('news', data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
