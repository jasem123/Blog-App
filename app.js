var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var tagsRouter = require('./routes/tags');
var commentsRouter = require('./routes/comments');
var categoriesRouter = require('./routes/categories');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret : 'oday'}))
app.use(function(req , res , next) {
  res.locals.session = req.session;
  next();
});


var admin = function(req ,res , next) {
  if (req.session.user) {
    if (req.session.user.isAdmin) {
      next();
    } else {
      res.redirect('/')
    }
  } else {
    res.redirect('/')
  }
}

app.use('/', indexRouter);
// app.use()
app.use('/users', admin , usersRouter);
app.use('/posts' , postsRouter);
app.use('/tags' , admin , tagsRouter);
app.use('/comments' ,admin ,  commentsRouter);
app.use('/categories' , admin , categoriesRouter);

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
