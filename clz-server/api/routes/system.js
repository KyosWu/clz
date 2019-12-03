const Router = require('koa-router');

const router = new Router({
    prefix: '/system'
});

const {
    controller
} = require('../controller/system')


/*控制面板信息*/
router.post('/system',controller);

module.exports = router;
