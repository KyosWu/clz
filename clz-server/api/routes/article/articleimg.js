const Router = require('koa-router');
const router = new Router({
    prefix: '/articleimg'
});

const {
    getToken,
    articleImgUpload,
    delArticleImg
} = require('../../controller/article/articleImg')

/*获取上传图片token*/
router.post('/article/getToken', getToken)
/*上传七牛云图片*/
router.post('/article/upload', articleImgUpload)
/*删除七牛云图片*/
router.post('/article/delArticleImg', delArticleImg)

module.exports = router;
