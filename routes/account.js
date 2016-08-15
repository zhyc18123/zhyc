/* GET accout page. */

var User = db.model('User');
var user = new User();
pin.router.post('/login', function(req, res, next) {
	var reqData = req.body;
	if (reqData.telephone !== undefined) { //表示点击了登录按钮
		var userMes = {
			tel: reqData.telephone,
			pwd: reqData.password
		};
	};
	var hasCallBack = function(ishav, doc) {
		if (!ishav) {
			var data = {
				err: 4,
				msg: "账号或密码错误!"
			};
			res.send(data);
		} else {
			req.session.user = doc;
			var data = {
				err: 0,
				msg: "登陆成功!"
			};
			res.send(data);
		};
	};
	user.ishav(userMes, hasCallBack);
});
pin.router.post('/register', function(req, res, next) {
	var reqData = req.body;
	if (reqData.telephone !== undefined) { //表示点击了登录按钮
		if (reqData.passwordOne == reqData.passwordTwo) {
			var userMes = {
				tel: reqData.telephone,
				pwd: reqData.passwordOne
			};
		} else {
			var data = {
				err: 4,
				msg: "两次输入的密码不同!"
			};
			res.send(data);
		}
	};
	var callBack = function(err, doc) {
		if (err) {
			var data = {
				err: 4,
				msg: err
			};
		} else {
			req.session.user = doc;
			var data = {
				err: 4,
				msg: "注册成功!"
			};
		};
		res.send(data);
	};
	var hasCallBack = function(ishav) {
		if (ishav) {
			var data = {
				err: 4,
				msg: "账号已存在"
			};
			res.send(data);
		} else {
			user.addUser(userMes, callBack);
		};
	};
	user.ishav({
		tel: reqData.telephone
	}, hasCallBack);
});
pin.router.post('/logout', function(req, res, next) {
	req.session.user = null;
	res.json({
		err: 0,
		msg: "注销成功!"
	});
});

pin.router.post('/updateUser', function(req, res, next) {
	var reqData = req.body;
	if (reqData.nick !== undefined) { //表示点击了登录按钮
		var userMes = {
			nick: reqData.nick,
			email: reqData.email,
			school: reqData.school,
			sex: reqData.sex,
			age: reqData.age,
			height: reqData.height,
			weight: reqData.weight,
			hobby: reqData.hobby
		};
	};
	var callBack = function(err, doc) {
		if (err) {
			var data = util.mixin(pin.config.res, {
				err: 4,
				msg: err
			})
			res.render('personcenter', data);
		} else {
			console.log(doc)
			req.session.user = doc;
			res.redirect("personcenter");
		};
	};
	user.updateUser(req.session.user._id, userMes, callBack);
});
module.exports = pin.router;