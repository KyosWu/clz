import Vue from 'vue'
import Router from 'vue-router'
import Per from './permission'
import Art from './article'

Vue.use(Router)

const router = new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import(/* webpackChunkName: 'index' */ '@/views/Index'),
      meta: {requireAuth: false}
    },
    {
      path: '/admin',
      component: () => import(/* webpackChunkName: 'admin' */ '@/views/admin.vue'),
      name: 'admin',
      meta: {requireAuth: true},
      children: [
        // system
        {
          path: '/system',
          name: 'system',
          component: () => import(/* webpackChunkName: 'Admin-index' */ '@/components/admin/Admin-index.vue'),
          meta: {requireAuth: true}
        },
        // 版本控制
        {
          path: '/version',
          name: 'version',
          component: () => import(/* webpackChunkName: 'version' */ '@/components/admin/Version.vue'),
          meta: {requireAuth: true}
        },
        // 用户权限
        { path: '/permission/adminList', name: 'adminList', component: Per.list, meta: {requireAuth: true} },
        { path: '/permission/adminAdd', name: 'adminAdd', component: Per.add, meta: {requireAuth: true} },
        // 文章
        { path: '/article', name: 'article', component: Art.art, meta: {keepAlive: true, requireAuth: true} },
        { path: '/article/:id', name: 'update', component: Art.update, meta: {requireAuth: true} },
        { path: 'list', name: 'articleList', component: Art.list, meta: {requireAuth: true} },
        // 评论
        {
          path: '/comment',
          name: 'comment',
          component: () => import(/* webpackChunkName: 'version' */ '@/components/admin/Comment.vue'),
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: 'noFound' */ '@/components/NoFound.vue'),
      meta: {
        title: '404未找到'
      }
    }
  ]
})

export default router
