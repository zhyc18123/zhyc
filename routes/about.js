/* GET home page. */
pin.router.get('/about', function(req, res, next) {
	var hasLogin = false;
	if (!!req.session.user) {
		hasLogin = true;
	};
	var data = util.mixin(pin.config.res, {
		hasLogin: hasLogin,
		user: req.session.user
	})
	res.render('about', data);
});

module.exports = pin.router;