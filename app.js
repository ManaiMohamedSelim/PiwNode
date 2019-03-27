var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./models/db');
var session = require('express-session');
var passport = require('passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var scrappingRouter = require('./routes/scrapping')
var forumRouter = require('./routes/forum');
var chatsRouter = require('./routes/chats');
var profileRouter = require('./routes/profile');

var trainingRouter = require('./routes/trainingSession');
var auth = require('./routes/auth')(passport);
require('./passport')(passport);
var cors = require('cors');
const fileUpload = require('express-fileupload');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'thesecret',
  saveUninitialized:false,
  resave:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/forum', forumRouter);
app.use('/auth', auth);
app.use('/chats',chatsRouter);
app.use('/trainingSession' , trainingRouter);
app.use('/profil' , profileRouter);
app.use('/scrapping' , scrappingRouter);

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
