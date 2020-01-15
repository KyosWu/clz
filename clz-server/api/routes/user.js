const jwt = require('koa-jwt');
const Router = require('koa-router');

const router = new Router({
    prefix: '/api/user'
});

const {
    login,list,add,update,del
} = require('../controller/user')


const { secret } = require('../../config/config');

const auth = jwt({ secret });

/*登录接口*/
router.post('/login',login);
router.post('/list',list);
router.post('/add',add);
router.post('/update',update);
router.post('/del',del);


module.exports = router;
