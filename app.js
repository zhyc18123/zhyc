var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  urlInit = require('./util/url'),
  app = express(),
  router = express.Router(),
  session = require('express-session'),
  sessionstore = require('sessionstore'),
  requireDir = require('require-dir'),
  util = requireDir("./util"),
  config = require('./config/config.js'),
  mongoose = require('mongoose');
global.util = util;
global.pin = {
  app: app,
  router: router,
  mongoose: mongoose,
  config: config
};
var db = require('./config/mongoose.js')();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/** session **/

app.use(session({

  secret: 'fens.me',

  cookie: {
    maxAge: 900000
  }, //session 的 保存时间，这里是半小时

  store: sessionstore.createSessionStore()

}));
//程序入口,监听所有的路由
var init = function() {
  urlInit();
}();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;