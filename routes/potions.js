const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Rota para a página de potions
router.get('/', async (req, res) => {
  try {
    const uri = 'mongodb+srv://leleyendev:yWqfXRQkCOxQ5s1b@cluster0.osjg6dw.mongodb.net/';
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Conexão estabelecida com o banco de dados MongoDB Atlas');

    // Acessar a coleção 'texts'
    const textsCollection = client.db('GrimoireData').collection(`user_${userId}`);

    // Consultar todos os documentos na coleção 'texts'
    const texts = await textsCollection.find().toArray();
    console.log('Documentos encontrados:', texts);

    // Renderizar a página de potions e passar os documentos encontrados
    res.render('potions', { title: 'Potions', texts: texts });

    client.close();
    console.log('Conexão encerrada com o banco de dados MongoDB Atlas');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados MongoDB Atlas', error);
    res.status(500).send('Erro ao conectar ao banco de dados');
  }
});

module.exports = router;