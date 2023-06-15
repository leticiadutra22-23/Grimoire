const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://leleyendev:yWqfXRQkCOxQ5s1b@cluster0.osjg6dw.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Conectado ao MongoDB Atlas');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB Atlas:', error);
  }
}

module.exports = { connectToMongoDB, client };
