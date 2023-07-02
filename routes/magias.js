const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Rota para a página de potions
router.get('/', async (req, res) => {
  try {
    const user = req.session.user;

    const uri = 'mongodb+srv://leleyendev:yWqfXRQkCOxQ5s1b@cluster0.osjg6dw.mongodb.net/';
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Conexão estabelecida com o banco de dados MongoDB Atlas');

    // Acessar a coleção específica do usuário
    const userCollection = client.db('GrimoireData').collection(`user_${user.username}`);

    // Consultar todos os documentos na coleção do usuário
    const texts = await userCollection.find().toArray();
    console.log('Documentos encontrados:', texts);

  
    res.render('magias', { title: 'Magias', texts: texts });

    client.close();
    console.log('Conexão encerrada com o banco de dados MongoDB Atlas');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados MongoDB Atlas', error);
    res.status(500).send('Erro ao conectar ao banco de dados');
  }
});

module.exports = router;