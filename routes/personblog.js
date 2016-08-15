/* GET home page. */
var Blog = db.model('Blog');
var blog = new Blog();
pin.router.get('/personblog', function(req, res, next) {
	var hasLogin = false;
	if (!!req.session.user) {
		hasLogin = true;
		var callback = function(err, docs) {
			var data = util.mixin(pin.config.res, {
				hasLogin: hasLogin,
				user: req.session.user,
				blogList: docs,
				scripts: ['js/personblog.js']
			})
			res.render('personblog', data);
		};
		var opt = {};
		opt.condition = {
			tel: req.session.user.tel
		};
		blog.findBlogs(opt, callback);
	} else {
		res.redirect('login');
	};
});
pin.router.post('/deleteBlog', function(req, res, next) {
	var reqData = req.body;
	var callback = function(err) {
		if (err) {
			res.send({
				err: 5,
				msg: err
			});
		} else {
			res.send({
				err: 0,
				msg: "删除成功"
			});
		};
	};
	blog.deleteBlog(reqData.blogId, callback);
});

module.exports = pin.router;