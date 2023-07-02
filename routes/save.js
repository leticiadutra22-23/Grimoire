const express = require('express');
const session = require('express-session');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Rota para salvar um novo texto
router.post('/', async (req, res) => {
  try {
    const { title, text, currentRoute } = req.body;

    // Obtém o usuário da sessão 
    const user = req.session.user;

    const uri = 'mongodb+srv://leleyendev:yWqfXRQkCOxQ5s1b@cluster0.osjg6dw.mongodb.net/';
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Conexão estabelecida com o banco de dados MongoDB Atlas');

    // Acessa a coleção específica do usuário
    const userCollection = client.db('GrimoireData').collection(`user_${user.username}`);

    const type = req.body.type;

    // Insere um novo documento na coleção do usuário
    const result = await userCollection.insertOne({ title: title, text: text, type: type });
    console.log('Novo documento inserido:', result.insertedId);

    client.close();
    console.log('Conexão encerrada com o banco de dados MongoDB Atlas');

    res.redirect(currentRoute);
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados MongoDB Atlas', error);
    res.status(500).send('Erro ao conectar ao banco de dados');
  }
});

module.exports = router;