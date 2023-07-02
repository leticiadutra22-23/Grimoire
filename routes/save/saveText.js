const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Rota para salvar um novo texto
router.post('/save', async (req, res) => {
  try {
    const { title, text } = req.body;

    // Obtém o ID de usuário da sessão (exemplo: usando o pacote 'express-session')
    const userId = req.session.userId;

    const uri = 'mongodb+srv://leleyendev:yWqfXRQkCOxQ5s1b@cluster0.osjg6dw.mongodb.net/';
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Conexão estabelecida com o banco de dados MongoDB Atlas');

    // Acessa a coleção específica do usuário
    const userCollection = client.db('GrimoireData').collection(`user_${userId}`);

    // Insere um novo documento na coleção do usuário
    const result = await userCollection.insertOne({ title: title, text: text, imageTitle: 'potion.png' });
    console.log('Novo documento inserido:', result.insertedId);

    client.close();
    console.log('Conexão encerrada com o banco de dados MongoDB Atlas');

    res.redirect('/potions');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados MongoDB Atlas', error);
    res.status(500).send('Erro ao conectar ao banco de dados');
  }
});

module.exports = router;