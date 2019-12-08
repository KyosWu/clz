import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Row, Col, Menu, MenuItem, Upload, Icon, Layout, Sider, Submenu, MenuGroup, Input, DatePicker, Card, RadioGroup, Radio, Notice, Tag, Table, Page, Modal, Message, Circle, Poptip, Switch, Divider } from 'iview'
import 'iview/dist/styles/iview.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from './utils/http'
import store from '@/store/index'
import commonPlugin from '@/plugins'

// 引入element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入echarts
import echarts from 'echarts'
// 引入vue-socket.io
import VueSocketIO from 'vue-socket.io'
// 必须原型链上添加
Vue.prototype.$echarts = echarts

Vue.use(new VueSocketIO({
  debug: true,
  // connection: 'http://localhost:4444/',
  connection: 'http://localhost:4444/',
  vuex: {
    store,
    options: {
      useConnectionNamespace: true
    },
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(commonPlugin)
Vue.use(axios)
// 引入element-ui
Vue.use(Element)
// 引入echarts
Vue.use(echarts)

Vue.component('Button', Button)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Menu', Menu)
Vue.component('MenuItem', MenuItem)
Vue.component('Icon', Icon)
Vue.component('Layout', Layout)
Vue.component('Sider', Sider)
Vue.component('Submenu', Submenu)
Vue.component('MenuGroup', MenuGroup)
Vue.component('Input', Input)
Vue.component('DatePicker', DatePicker)
Vue.component('Card', Card)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('Tag', Tag)
Vue.component('Table', Table)
Vue.component('Page', Page)
Vue.component('Modal', Modal)
Vue.component('i-circle', Circle)
Vue.component('Poptip', Poptip)
Vue.component('Upload', Upload)
Vue.component('i-Switch', Switch)
Vue.component('Divider', Divider)

Vue.prototype.$Notice = Notice
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  // 判断是否区登录页面
  if (to.name === 'Index') {
    next()
  } else {
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
      const token = sessionStorage.getItem('token')
      // 通过vuex state获取当前的token是否存在
      if (token) {
        next()
      }
      if (!token) {
        next({path: '/'})
      }
    }
  }

  // 访问 admin 跳转至system
  if (to.name === 'admin') {
    router.push({path: '/system'})
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
