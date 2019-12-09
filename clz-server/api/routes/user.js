const Router = require('koa-router');

const router = new Router({
    prefix: '/api/user'
});

const {
    login,info,list,add,update,del
} = require('../controller/user')


/*登录接口*/
router.post('/login',login);
router.post('/info',info);
router.post('/list',list);
router.post('/add',add);
router.post('/update',update);
router.post('/del',del);


module.exports = router;
