var Blog = db.model('Blog');
var blog = new Blog();
pin.router.get('/blog', function(req, res, next) {
	var reqData = req.query;
	console.log(reqData)
	var hasLogin = false;
	if (!!req.session.user) {
		hasLogin = true;
		var data = util.mixin(pin.config.res, {
			hasLogin: hasLogin,
			user: req.session.user,
			styles: ['http://netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css', 'css/editor.css'],
			scripts: ['js/editor.js', 'js/blog.js'],
			pageType: reqData.type
		});
		res.render('blog', data);
	} else {
		res.redirect('login');
	};
});
pin.router.post('/publish', function(req, res, next) {
	var reqData = req.body;
	if (!!req.session.user) {
		var blogData = {
			tel: req.session.user.tel,
			blogTitle: reqData.blogTitle,
			blogText: reqData.blogText
		}
		console.log(blogData)
	};
	var callBack = function(err) {
		if (err) {
			res.json({
				err: 4,
				msg: err
			})
		} else {
			res.json({
				success: 0,
				msg: "成功"
			})
		};
	};
	console.log(reqData)
	if (reqData.blogId) {
		blog.updateBlog(reqData.blogId, blogData, callBack)
	} else {
		blog.addBlog(blogData, callBack);
	};
})

module.exports = pin.router;