var BlogSchema = new pin.mongoose.Schema({
	tel: String,
	blogTitle: String,
	blogText: String
});
///查找博文是否存在
BlogSchema.methods.ishav = function(ob, callBack) { //判断某个字段值是否存在,ob是筛选对象，如：{email:'245'}
	var Blog = db.model('Blog');
	this.model('Blog').findOne(ob, function(err, doc) {
		if (!err && doc) {
			callBack(true);
		} else {
			callBack(false);
		}
	});
};
///发布新博文
BlogSchema.methods.addBlog = function(blogMes, callBack) {
	var Blog = db.model('Blog');
	var blog = new Blog(blogMes);
	blog.save(function(err) {
		callBack(err);
	});
};
// 删除指定条件记录
BlogSchema.methods.deleteBlog = function(id, callBack) {
	this.model("Blog").remove({
		_id: id
	}, function(err) {
		callBack(err);
	});
};
BlogSchema.methods.updateBlog = function(id, obj, callBack) {
	this.model("Blog").update({
		_id: id
	}, {
		$set: obj
	}, function(err) {
		callBack(err);
	});
};
// 按条件查找博文
BlogSchema.methods.findBlogs = function(opt, callBack) {
	var query = this.model('Blog').find(opt.condition);
	if (opt.limit == undefined) {
		query.limit(opt.limit);
	};
	if (opt.skip == undefined) {
		query.skip(opt.skip);
	};
	query.exec(function(err, docs) {
		callBack(err, docs);
	});
};
pin.mongoose.model('Blog', BlogSchema);