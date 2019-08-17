const path = require('path')
const glob = require('glob')

const Router = require('koa-router')
const router = new Router()

// 加载中间件
router.use(require('../middleware/paramsAuth'))

// 加载路由
glob(path.join(__dirname, './**.js'), function (err, files) {
	files.forEach(function (file) {
		if (file.indexOf('index.js') >= 0) return
		router.use('/api', require(file).routes())
	})
})

module.exports = router