const Router = require('koa-router');

const router = new Router({
    prefix: '/comment'
});

const {
    insertComment,
    articleComments,
    commentsList,
    commentConfig,
    configList,
    delComment
} = require('../../controller/comment')


/*评论接口*/
router.post('/comment', insertComment)
/*评论列表接口*/
router.post('/articleComments', articleComments)
/*后台评论列表管理*/
router.post('/commentsList', commentsList)
/*后台评论配置接口*/
router.post('/config', commentConfig)
/*后台评论配置列表*/
router.post('/config/list', configList)
/*删除某一条评论接口*/
router.post('/delComment', delComment)

module.exports = router;


