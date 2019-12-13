const Router = require('koa-router');

const router = new Router({
    prefix: '/api/comment'
});

const {
    insertComment,
    articleComments,
    commentsList,
    commentConfig,
    configList,
    delComment,
    articleCommentsList,
    articleCommentsInsert,
} = require('../../controller/article/comment')


/*评论接口*/
router.post('/comment', insertComment)
/*评论列表接口*/
router.post('/articleComments', articleComments)

/*中台-评论列表管理*/
router.post('/commentsList', commentsList)
/*中台-评论配置接口*/
router.post('/config', commentConfig)
/*中台-评论配置列表*/
router.post('/config/list', configList)
/*中台-删除某一条评论接口*/
router.post('/delComment', delComment)

/*前端网页-评论列表*/
router.get('/articleCommentsList', articleCommentsList)
/*前端网页-评论新增*/
router.post('/articleCommentsInsert', articleCommentsInsert)



module.exports = router;


