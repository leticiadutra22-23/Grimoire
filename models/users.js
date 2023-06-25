const { MongoClient, ObjectId } = require('mongodb');

// Função para conectar ao banco de dados
async function connectToDatabase() {
  const uri = 'mongodb+srv://leleyendev:yWqfXRQkCOxQ5s1b@cluster0.osjg6dw.mongodb.net/';

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Conexão bem-sucedida ao banco de dados');
    return client.db('<GrimoireData>');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}

// Função para criar um usuário
async function createUser(username, password, witchtype) {
  const db = await connectToDatabase();
  const collection = db.collection('users');

  const newUser = {
    username: username,
    password: password,
    witchtype: witchtype
  };

  const result = await collection.insertOne(newUser);
  console.log('Usuário criado com sucesso:', result.insertedId);
}

// Função para encontrar um usuário pelo nome de usuário
async function findUserByUsername(username) {
  const db = await connectToDatabase();
  const collection = db.collection('users');

  const user = await collection.findOne({ username: username });
  return user;
}

// Exporta as funções do módulo
module.exports = {
  createUser,
  findUserByUsername
};