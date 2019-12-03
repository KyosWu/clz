const Router = require('koa-router');


const router = new Router({
    prefix: '/update'
});

const {
    update,
    updateContent
} = require('../../controller/update')


// 接口修改
/*修改文章接口*/
router.get('/update',update);
router.post('/updateContent',updateContent);

module.exports = router;


