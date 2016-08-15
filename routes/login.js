/* GET home page. */
pin.router.get('/login', function(req, res, next) {
	var hasLogin = false;
	if (!!req.session.user) {
		hasLogin = true;
	};
	var data = util.mixin(pin.config.res, {
		hasLogin: hasLogin,
		user: req.session.user,
		scripts: ['js/index.js']
	})
	res.render('login', data);
});

module.exports = pin.router;