var express = require('express');
var router = express.Router();

// Rota GET para exibir a página de login
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

// Rota POST para processar o login
router.post('/', function(req, res, next) {
  
});

module.exports = router;
