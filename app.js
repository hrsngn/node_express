var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/Auth');

var authService = require('./services/authService');

var app = express();

var CONSTANTA = require('./globals/constanta');

//TODO : use middleware to check credential
app.all('*', checkUser);
function checkUser(req, res, next) {
  var _ = require('underscore')
      , nonSecurePaths = ['/auth', '/checkToken'];

  if ( _.contains(nonSecurePaths, req.path) ) return next();

  //authenticate user
  res.status(401).send("sampean sinten ?");
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//cors
app.use(cors({
  origin: CONSTANTA.cors
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
