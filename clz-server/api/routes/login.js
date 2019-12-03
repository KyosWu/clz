const Router = require('koa-router');

const router = new Router({
    prefix: '/login'
});

const {
    login
} = require('../controller/login')


/*登录接口*/
router.post('/login',login);

module.exports = router;
