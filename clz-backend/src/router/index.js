import Vue from 'vue'
import Router from 'vue-router'
import Per from './permission'
import Art from './article'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/Index'),
      meta: {requireAuth: false}
    },
    {
      path: '/admin',
      component: () => import('@/views/admin.vue'),
      name: 'admin',
      meta: {requireAuth: true, title: 'dashboard'},
      children: [
        // system
        {
          path: '/system',
          name: 'system',
          component: () => import('@/components/admin/Admin-index.vue'),
          meta: {requireAuth: true, title: '系统概览'}
        },
        // 版本控制
        {
          path: '/version',
          name: 'version',
          component: () => import('@/components/admin/Version.vue'),
          meta: {requireAuth: true, title: '版本'}
        },
        {
          path: '/socketio',
          name: 'socketio',
          component: () => import('@/components/socketio/Socketio.vue'),
          meta: {requireAuth: true, title: 'socketIo'}
        },
        // 用户权限
        { path: '/permission/adminList', name: 'adminList', component: Per.list, meta: {requireAuth: true, title: '管理员列表'} },
        { path: '/permission/adminAdd', name: 'adminAdd', component: Per.add, meta: {requireAuth: true, title: '添加管理员'} },
        // 文章
        { path: '/article', name: 'article', component: Art.art, meta: {keepAlive: true, requireAuth: true, title: '写文章'} },
        { path: '/article/:id', name: 'update', component: Art.update, meta: {keepAlive: true, requireAuth: true, title: '修改文章'} },
        { path: 'list', name: 'articleList', component: Art.list, meta: {keepAlive: true, requireAuth: true, title: '文章列表'} },
        // 评论
        {
          path: '/comment',
          name: 'comment',
          component: () => import('@/components/admin/Comment.vue'),
          meta: {requireAuth: true, title: '评论管理'}
        },
        // 标签管理
        { path: '/tag',
          name: 'tag',
          component: () => import('@/components/admin/Tag.vue'),
          meta: {keepAlive: true, requireAuth: true, title: '标签管理'} }
      ]
    },
    {
      path: '/NoFound',
      name: 'NoFound',
      component: () => import('@/components/NoFound.vue'),
      meta: {requireAuth: false, title: '404未找到'}
    },
    {
      path: '*',
      redirect: '/NoFound',
      name: '404',
      hidden: true
    }
  ]
})

export default router
