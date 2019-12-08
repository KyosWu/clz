<template>
  <div>
    <el-button @click="clickButton">我是按钮</el-button>

    <!--无限滚动列表-->
    <template>
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li v-for="i in count" class="infinite-list-item">{{ rnews }}</li>
      </ul>
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li v-for="i in count" class="infinite-list-item">{{ rinfo }}</li>
      </ul>
    </template>

    <!--图表-->
    <template>
      <div id="line-chart"></div>
    </template>

    <!--用户表单-->
    <template>
      <el-table
        :data="usersInfo"
        style="width: 100%">
        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="role"
          label="用户权限"
          width="180">
        </el-table-column>
      </el-table>
    </template>

  </div>
</template>

<script>
// 跟vuex交互目前有问题，暂时没法解决，所以前端的命名空间页没法做
// import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      count: 0,
      rnews: '',
      rinfo: '',
      usersInfo: []
    }
  },
  mounted () {
    this.line()
    // 判断是否支持socketio
    var timerOne = window.setInterval(() => {
      if (this.$socket) {
        this.$socket.emit('isSocket', 'is socket')
        window.clearInterval(timerOne)
      }
    }, 5)
    this.sockets.subscribe('rnews', (res) => {
      console.log('前端监听了:', res)
      this.rnews = res
    })
    this.sockets.subscribe('rinfo', (res) => {
      console.log('info前端监听了:', res)
      this.rinfo = res
    })
    this.sockets.subscribe('ruserInfo', (res) => {
      this.usersInfo = res
    })
    this.sockets.subscribe('rclickBtn', (res) => {
      console.log(res)
    })
  },
  created () {
    // this.initUser()
    // this.initSocketInfo()
    // this.initSocketNews()
  },
  computed: {
    // ...mapGetters([
    //   'userInfo'
    // ]),
    // ...mapActions([
    //   'USERINFO'
    // ])
  },
  sockets: {
    // 监听链接
    connect: function () {
      console.log('服务器连接成功')
    },
    reconnect (data) {
      console.log('断开连接', data)
    },
    // 监听断开连接，函数
    disconnect (data) {
      console.log(data)
    }
  },
  methods: {
    // element-ui 无限滚动
    load () {
      if (this.count < 1) {
        this.count += 1
      }
    },
    // 获取用户信息
    initUser () {
      // 可以自定义轮询间隔时间
      // 写法一
      setInterval(() => {
        let userInfo = '给我用户信息'
        this.$socket.emit('userInfo', userInfo)
      }, 5000)
      // 写法二
      // let userInfo = '给我用户信息'
      // this.$socket.emit('userInfo', userInfo)
    },
    initSocketInfo () { // 初始化socket
      this.$socket.emit('info', '给我info')
    },
    initSocketNews () {
      this.$socket.emit('news', '给我news')
    },
    // 点击按钮事件
    clickButton: function () {
      let data = '前端点击了'
      try {
        this.$socket.emit('clickBtn', data)
      } catch (e) {
        console.log(e)
      }
    },
    line () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('line-chart'))
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        grid: {
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      })
    }
  }
}
</script>

<style scoped>
  #line-chart {
    height: 300px;
    width: 300px;
    z-index: 9999;
  }
</style>
