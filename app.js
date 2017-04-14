var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var user_profile = require('./routes/user_profile');
var satellite_data = require('./routes/satellite_data');
var fire_detection = require('./routes/fire_detection');
var fire_prediction = require('./routes/fire_prediction');
var maps = require('./routes/maps');
var fire_fighters = require('./routes/fire_fighters');
var notifications = require('./routes/notifications');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/', index);
app.use('/user_profile', user_profile);
app.use('/satellite_data', satellite_data);
app.use('/fire_prediction', fire_prediction);
app.use('/maps', maps);
app.use('/fire_fighters', fire_fighters);
app.use('/notifications', notifications);
app.use('/users', users);
app.use('/maps/getlatlong', maps);
app.use('/fire_detection', fire_detection);
app.all('/fire_prediction', fire_prediction);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
