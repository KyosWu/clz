const Router = require('koa-router');

const router = new Router({
    prefix: '/api/user'
});

const {
    login,info,list,add
} = require('../controller/user')


/*登录接口*/
router.post('/login',login);
router.post('/info',info);
router.post('/list',list);
router.post('/add',add);

module.exports = router;
