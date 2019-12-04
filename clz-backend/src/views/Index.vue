<template>
  <div class="login_images">
      <!-- <router-link :to="{name:'admin'}">跳转admin页面</router-link> -->
      <Row>
        <Col span="4" offset="20" style="float:right;margin-right:10%;margin-top:20%;">
          <Card>
            <p slot="title">欢迎登录</p>
            <Input v-model="loginInfo.username" type="text" placeholder="请输入用户名" name="username">
              <span slot="prepend"><i class="icon iconfont icon-yonghu"></i></span>
            </Input>
            <br>
            <Input v-model="loginInfo.password" type="password" placeholder="请输入密码" name="password">
              <span slot="prepend"><i class="icon iconfont icon-mima"></i></span>
            </Input>
            <br>
            <Button type="primary" long @click="user(loginInfo.username,loginInfo.password)">登录</Button>
          </Card>
        </Col>
      </Row>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      loginInfo: {
        username: '',
        password: ''
      }
    }
  },
  mounted () {
    // 判断是否有token,如果存在且路由直接切到index,返回admin页面（system页面）
    const setToken = sessionStorage.getItem('token')
    if (!setToken) {
      this.$router.push({name: 'Index'})
    } else {
      this.$router.push({name: 'admin'})
    }
  },
  methods: {
    // 设置用户名vuex方法
    ...mapMutations(['setUserName']),
    user (username, password) {
      let json = {username, password}
      this.$axios.post('/user/login', json).then(async res => {
        let {error, msg} = res.data
        if (Object.is(error, 0)) {
          await this.$store.dispatch('setBaseInfo', this.loginInfo)
          this.$router.push({name: 'system'})
        } else if (Object.is(error, 1)) {
          this.error('用户名错误', msg, false)
        } else {
          this.error('密码错误', msg, false)
        }
      })
    }
  },
  computed: {
    ...mapState(['tokenName'])
  }
}
</script>
<style lang="less">
  .login_images {
    width:100%;
    height:100vh;
    background:url('../../static/images/login.jpeg') no-repeat;
    background-size:cover;
    background-position: center center;
  }
</style>
