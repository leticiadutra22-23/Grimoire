var express = require('express');
const session = require('express-session');
var router = express.Router();

// Rota GET para exibir a página inicial
router.get('/', function(req, res, next) {
  if (req.session.isAuthenticated) {
    const user = req.session.user;
    res.render('index', { user: user });
  } else {
    res.redirect('/login');
  }
});


module.exports = router;