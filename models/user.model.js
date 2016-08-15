var UserSchema = new pin.mongoose.Schema({
	nick: String, //昵称
	email: String,
	tel: String,
	pwd: String, //密码
	school: String,
	sex: String,
	age: String,
	height: String,
	weight: String,
	hobby: String
});
///查找账号是否存在
UserSchema.methods.ishav = function(ob, callBack) { //判断某个字段值是否存在,ob是筛选对象，如：{email:'245'}
	var User = db.model('User');
	User.findOne(ob, function(err, doc) {
		if (!err && doc) {
			callBack(true, doc);
		} else {
			callBack(false);
		}
	});
};
///注册一个新账号
UserSchema.methods.addUser = function(userMes, callBack) {
	var User = db.model('User');
	var user = new User(userMes);
	user.save(function(err, doc) {
		callBack(err, doc);
	});
};
///修改账号
UserSchema.methods.updateUser = function(_id, userMes, callBack) {
	var User = db.model('User');
	User.findByIdAndUpdate(_id, {
		$set: userMes
	}, {
		new: true
	}, function(err, doc) {
		callBack(err, doc);
	});
};
pin.mongoose.model('User', UserSchema);