const express = require('express');
const session = require('express-session');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { MongoClient } = require('mongodb');

var indexRouter = require('./routes/index');
var moonRouter = require('./routes/moon'); 
var yearRouter = require('./routes/year');
var booksRouter = require('./routes/books');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

var app = express();
// Configuração do middleware de sessão
app.use(session({
  secret: 'mariaoliveira',
  resave: false,
  saveUninitialized: true
}));

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
  var isAuthenticated = req.session.isAuthenticated || false;
  var allowedRoutes = ['/login', '/register'];

  if (!allowedRoutes.includes(req.url) && !isAuthenticated) {
    res.redirect('/login');
  } else {
    req.session.user = req.session.user || null;
    next();
  }
});

// Rota GET para fazer logout
app.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      console.error('Erro ao fazer logout:', err);
    }
    res.redirect('/login');
  });
});

// Configurações de conexão com o banco de dados
const uri = 'mongodb+srv://leleyendev:yWqfXRQkCOxQ5s1b@cluster0.osjg6dw.mongodb.net/';

// Cria uma instância do MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Conecta ao banco de dados
client.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  
  console.log('Conexão bem-sucedida ao banco de dados');

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
});

app.use('/', indexRouter);
app.use('/moon', moonRouter);
app.use('/year', yearRouter); 
app.use('/books', booksRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

module.exports = app;