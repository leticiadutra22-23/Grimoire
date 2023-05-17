var express = require('express');
var router = express.Router();

app.get('/register', function(req, res) {
  res.render('register', { title: 'Cadastro' });
});

module.exports = router;
