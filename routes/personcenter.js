/* GET home page. */
pin.router.get('/personcenter', function(req, res, next) {
	var hasLogin = false;
	if (!!req.session.user) {
		hasLogin = true;
		var data = util.mixin(pin.config.res, {
			hasLogin: hasLogin,
			user: req.session.user,
			scripts: ['js/personcenter.js']
		})
		res.render('personcenter', data);
	} else {
		res.redirect('login');
	};
});

module.exports = pin.router;