const Router = require('koa-router');
const router = new Router({
    prefix: '/api/articleimg'
});

const {
    getToken,
    articleImgUpload,
    delArticleImg
} = require('../../controller/article/articleImg')

/*获取上传图片token*/
router.post('/getToken', getToken)
/*上传七牛云图片*/
router.post('/upload', articleImgUpload)
/*删除七牛云图片*/
router.post('/delArticleImg', delArticleImg)

module.exports = router;
