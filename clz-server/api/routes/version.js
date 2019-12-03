const Router = require('koa-router');

const router = new Router({
    prefix: '/api/version'
});

const {
    insertVersion,
	getVersion
} = require('../controller/version')


/*发布版本接口*/
router.post('/insert',insertVersion);
/*获取版本接口*/
router.get('/getVersion',getVersion);

module.exports = router;
