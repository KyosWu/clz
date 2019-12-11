const Router = require('koa-router');

const router = new Router({
    prefix: '/api/delArticle'
});

const {
    delArticle
} = require('../../controller/article/delete')

/*删除文章接口*/
router.post('/delArticle',delArticle);

module.exports = router;


