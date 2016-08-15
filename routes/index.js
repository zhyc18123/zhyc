/* GET home page. */
var Blog = db.model('Blog');
var blog = new Blog();
var router = pin.router.get('/', function(req, res, next) {
	var hasLogin = false;
	if (!!req.session.user) {
		hasLogin = true;
	};
	var callback = function(err, docs) {
		var data = util.mixin(pin.config.res, {
			hasLogin: hasLogin,
			user: req.session.user,
			blogList: docs,
			scripts: ['js/index.js']
		})
		res.render('index', data);
	};
	var opt = {};
	opt.condition = {};
	opt.limit = 500;
	opt.skip = 0;
	blog.findBlogs(opt, callback);
});

module.exports = router;