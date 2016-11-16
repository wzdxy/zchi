var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var session = require('express-session');
var routes = require('./routes/index');
// var users = require('./routes/users');
var blog = require('./routes/blog');
var ucenter = require('./routes/ucenter');
var logout=require('./routes/logout');

var db=require('./db.js');

var app = express();



app.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

app.use(cookieParser());
app.use(session({
  secret: 'secret_user',
  name: 'name_user',
  cookie:{maxAge:15*60*1000},
  httpOnly:true,
  resave:true,
  saveUninitialized:true
}));

app.use('/',function (req, res,next) {
  if(req.cookies.name_user==undefined)res.cookie('name_user',req.sessionID,{maxAge:24*3600});
  next();
})


app.set('view engine', 'html');
app.engine('.html',require('ejs').__express);
app.use(partials());


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/static',express.static('public'));
app.use('/static',express.static('static'));

app.use('/', routes);
// app.use('/users', users);
app.use('/blog', blog);
app.use('/ucenter', ucenter);
app.use('/logout', logout);

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


var server=app.listen(3000,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log('listening :'+port);
})