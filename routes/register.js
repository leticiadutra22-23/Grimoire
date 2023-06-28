const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://leleyendev:yWqfXRQkCOxQ5s1b@cluster0.osjg6dw.mongodb.net/';
const dbName = 'GrimoireData';

router.get('/', function(req, res, next) {
  res.render('register', { title: 'Cadastro', passwordMismatch: false });
});

router.post('/', async function(req, res, next) {
  const { username, password, confpassword, witchtype } = req.body;

  if (password !== confpassword) {
    return res.render('register', { title: 'Cadastro', passwordMismatch: true, error: 'As senhas não coincidem' });
  }

  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();

    const db = client.db('GrimoireData');
    const collection = db.collection('users');

    const existingUser = await collection.findOne({ username: username });

    if (existingUser) {
      return res.render('register', { title: 'Cadastro', passwordMismatch: false, error: 'O nome de usuário já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username: username,
      password: hashedPassword,
      witchtype: witchtype
    };

    await collection.insertOne(newUser);

    res.redirect('/login');
  } catch (error) {
    console.error('Erro ao registrar usuário: ', error);
    return res.render('register', { title: 'Cadastro', passwordMismatch: false, error: 'Erro ao cadastrar usuário' });
  }
});

module.exports = router;