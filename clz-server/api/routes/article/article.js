const Router = require('koa-router');
// storage 功能
const multer = require('koa-multer');
//配置
const storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
const upload = multer({storage: storage})

const router = new Router({
    prefix: '/article'
});

const {
    insertArticle,
    getArticle,
    articleInfo,
    uploadFile,
    deleteFile,
    findOneArticle
} = require('../../controller/article/article')

// 文章
/*插入文章接口*/
router.post('/insertFront',insertArticle);
// router.post('/article/insertBack',backArticle.insertArticle);
/*查询文章接口*/
router.get('/getFrontArticle',getArticle);
// router.get('/article/getBackArticle',backArticle.getArticle);
/*文章详情接口*/
router.get('/getFrontArticleInfo',articleInfo);
// router.get('/article/getBackArticleInfo',backArticle.articleInfo);
/*上传接口*/
router.post('/upload',upload.single('file'), uploadFile);
/*删除图片接口*/
router.post('/deleteFile', deleteFile)
/*查询单文章*/
router.post('/findOneArticle', findOneArticle)



/* 导出blog路由 */
module.exports = router;
