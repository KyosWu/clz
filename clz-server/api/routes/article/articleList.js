const Router = require('koa-router');

const router = new Router({
    prefix: '/articleList'
});

const {
    frontList,
    backList
} = require('../../controller/article/articleList')


/*文章列表接口*/
router.get('/article/frontList', frontList);
router.get('/article/backList', backList);

module.exports = router;
