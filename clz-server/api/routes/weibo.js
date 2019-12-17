const Router = require('koa-router');

const router = new Router({
    prefix: '/api/weibo'
});

const {
    list
} = require('../controller/weibo')

// 获取所有字段
router.get('/list',list);

module.exports = router;
