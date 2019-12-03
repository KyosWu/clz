const router = require('koa-router')();
const backArticle = require('../controller/backArticle');
const articleList = require('../controller/articleList');
const del = require('../controller/delete');
const version = require('../controller/version');
const LoginStrategy = require('../controller/login');
const {geet, validate} = require('../controller/geet');
const system = require('../controller/system');
const {insertComment, articleComments, commentsList, commentConfig, configList, delComment} = require('../controller/comment');

// 路由前缀
router.prefix('/api');


/*文章列表接口*/
router.get('/article/frontList',articleList.frontList);
router.get('/article/backList',articleList.backList);
/*删除文章接口*/
router.post('/article/delArticle',del.delArticle);
/*发布版本接口*/
router.post('/version/insert',version.insertVersion);
/*获取版本接口*/
router.get('/version/getVersion',version.getVersion);
/*登录接口*/
router.post('/login',LoginStrategy.login);
/*控制面板信息*/
router.post('/system',system.controller);
/*评论接口*/
router.post('/comment', insertComment)
/*评论列表接口*/
router.post('/articleComments', articleComments)
/*后台评论列表管理*/
router.post('/commentsList', commentsList)
/*后台评论配置接口*/
router.post('/comment/config', commentConfig)
/*后台评论配置列表*/
router.post('/comment/config/list', configList)
/*删除某一条评论接口*/
router.post('/comment/delComment', delComment)
/*获取极验校验*/
router.get('/geet', geet)



module.exports = router;
