const SunCalc = require('suncalc');
const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();

// URL de conexão com o MongoDB
const uri = 'mongodb+srv://leleyendev:yWqfXRQkCOxQ5s1b@cluster0.osjg6dw.mongodb.net/';
const dbName = 'GrimoireData';
const collectionName = 'moonphases';

router.get('/', async function(req, res, next) {
  let client; // Declare a variável client aqui

  try {
    client = await MongoClient.connect(uri);
    const moonPhaseData = await getCurrentMoonPhase(client);
    res.render('moon', { title: 'Grimoire', phaseData: moonPhaseData });
  } catch (error) {
    console.error('Erro na obtenção da fase da lua:', error);
    res.render('error', { message: 'Erro na obtenção da fase da lua', error: error });
  } finally {
    if (client) {
      client.close();
    }
  }
});

async function getCurrentMoonPhase(client) { // Receba a variável client como parâmetro
  const currentDate = new Date();
  const moonPosition = SunCalc.getMoonIllumination(currentDate);
  const moonPhase = moonPosition.phase;

  if (moonPhase >= 0 && moonPhase < 0.25) {
    return fetchMoonPhaseData(client, 'LUA NOVA');
  } else if (moonPhase >= 0.25 && moonPhase < 0.5) {
    return fetchMoonPhaseData(client, 'CRESCENTE');
  } else if (moonPhase >= 0.5 && moonPhase < 0.75) {
    return fetchMoonPhaseData(client, 'MINGUANTE');
  } else {
    return fetchMoonPhaseData(client, 'LUA CHEIA');
  }
}

async function fetchMoonPhaseData(client, phaseTitle) { // Receba a variável client como parâmetro
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const moonPhaseData = await collection.findOne({ title: phaseTitle });

    if (moonPhaseData) {
      const { title, description, tips, todo, image } = moonPhaseData;
      return {
        title,
        description,
        tips,
        todo,
        image
      };
    } else {
      return `Dados da ${phaseTitle} não encontrados`;
    }
  } catch (error) {
    console.error('Erro na conexão com o banco de dados:', error);
    throw new Error('Erro na conexão com o banco de dados');
  }
}

module.exports = router;