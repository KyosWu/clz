const router = require('koa-router')();
const version = require('../controller/version');
const LoginStrategy = require('../controller/login');
const {geet, validate} = require('../controller/geet');
// 路由前缀
router.prefix('/api');

/*发布版本接口*/
router.post('/version/insert',version.insertVersion);
/*获取版本接口*/
router.get('/version/getVersion',version.getVersion);
/*登录接口*/
router.post('/login',LoginStrategy.login);

/*获取极验校验*/
router.get('/geet', geet)



module.exports = router;
