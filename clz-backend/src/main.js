import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Row, Col, Menu, MenuItem, Upload, Icon, Layout, Sider, Submenu, MenuGroup, Input, DatePicker, Card, RadioGroup, Radio, Notice, Tag, Table, Page, Modal, Message, Circle, Poptip, Switch, Divider } from 'iview'
import 'iview/dist/styles/iview.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from './utils/http'
import store from '@/vuex/store'
import commonPlugin from '@/plugins'

// 引入element-ui组件
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(commonPlugin)
Vue.use(axios)
Vue.use(Element)

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
  // 如果router路由中存在标识符需要鉴权
  if (to.meta.requireAuth) {
    // 存在放行
    if (store.state.tokenName) {
      next()
    } else {
      let storage = window.sessionStorage
      if (storage.getItem('username') != null) {
        next()
      } else {
        next({path: '/error'})
      }
    }
  } else {
    next()
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
