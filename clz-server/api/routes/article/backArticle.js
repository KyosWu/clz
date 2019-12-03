const Router = require('koa-router');

const router = new Router({
    prefix: '/api/backArticle'
});

const {
	insertArticle,
	getArticle,
	articleInfo
} = require('../../controller/article/backArticle')



module.exports = router;


