var express = require('express');
var router = express.Router();

app.get('/login', function(req, res) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
