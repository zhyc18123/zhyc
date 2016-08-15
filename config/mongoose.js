module.exports = function() {
	var db;
	if (global.db) {
		db = global.db;
	} else {
		db = pin.mongoose.connect(pin.config.mongodb);
		require('../models/user.model.js');
		require('../models/blog.model.js');
		global.db = db;
	}
	return db;
}