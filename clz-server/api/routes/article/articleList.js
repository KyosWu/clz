const Router = require('koa-router');

const router = new Router({
    prefix: '/api/articleList'
});

const {
    frontList,
    backList
} = require('../../controller/article/articleList')


/*文章列表接口*/
router.get('/frontList', frontList);
router.get('/backList', backList);

module.exports = router;
