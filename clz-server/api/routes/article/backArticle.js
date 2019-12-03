const Router = require('koa-router');

const router = new Router({
    prefix: '/backArticle'
});

const {
	insertArticle,
	getArticle,
	articleInfo
} = require('../../controller/article/backArticle')



module.exports = router;


