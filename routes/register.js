var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user'); 

// GET rota de registro
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Cadastro' });
});

// POST rota de registro
router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var witchtype = req.body.witchtype;

  // Gere o hash da senha
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      console.log(err);
      res.redirect('/register'); 
    } else {
      var newUser = new User({
        username: username,
        password: hash, 
        witchtype: witchtype
      });

      // Salvando o novo usuário no banco de dados
      newUser.save(function(err) {
        if (err) {
          console.log(err);
          res.redirect('/register'); 
        } else {
          res.redirect('/login');
        }
      });
    }
  });
});

module.exports = router;