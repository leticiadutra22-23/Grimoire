const express = require('express');
const session = require('express-session');
const router = express.Router();
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

// Configurações de conexão com o banco de dados
const uri = 'mongodb+srv://leleyendev:yWqfXRQkCOxQ5s1b@cluster0.osjg6dw.mongodb.net/';
const dbName = 'GrimoireData';

// Rota GET para exibir a página de login
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login', error: null });
});

// Rota POST para processar o login
router.post('/', async function(req, res, next) {
  const { username, password } = req.body;

  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('users');

    const user = await collection.findOne({ username: username });

   if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        req.session.isAuthenticated = true;
        req.session.user = user;
        res.render('index', { user: user });
        return;
      }
    }

    res.render('login', { title: 'Login', error: 'Nome de usuário ou senha inválidos' });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.render('login', { title: 'Login', error: 'Erro ao realizar login' });
  }
});


module.exports = router;
