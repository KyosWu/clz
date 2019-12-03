const Router = require('koa-router');

const router = new Router({
    prefix: '/geet'
});

const {
    geet
} = require('../controller/geet')


/*获取极验校验*/
router.get('/geet', geet)

module.exports = router;
