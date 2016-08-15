/* GET home page. */
pin.router.get('/register', function(req, res, next) {
	var hasLogin = false;
	if (!!req.session.user) {
		hasLogin = true;
	};
	var data = util.mixin(pin.config.res, {
		hasLogin: hasLogin,
		user: req.session.user
	})
	res.render('register', data);
});

module.exports = pin.router;