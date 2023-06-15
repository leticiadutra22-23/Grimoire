var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moonRouter = require('./routes/moon'); 
var yearRouter = require('./routes/year');
var booksRouter = require('./routes/books');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para verificar autenticação
app.use(function(req, res, next) {
  var isAuthenticated = false; 
  if (!isAuthenticated && req.url !== '/login' && req.url !== '/register') {
    res.redirect('/login');
  } else {
    next();
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/moon', moonRouter);
app.use('/year', yearRouter); 
app.use('/books', booksRouter);
app.use('/login', loginRouter); 
app.use('/register', registerRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
var express = require('express');
var router = express.Router();


module.exports = app;
