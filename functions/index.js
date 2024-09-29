const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors");

admin.initializeApp();

const db = admin.firestore();
const corsHandler = cors({origin: true});

// Rota para obter perguntas gerais
exports.getPerguntasGerais = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const perguntasSnapshot = await db.collection("perguntasGerais").get();
      const perguntasGerais = perguntasSnapshot.docs.map((doc) => doc.data());
      res.json(perguntasGerais);
    } catch (error) {
      res.status(500).json({error: "Erro ao obter perguntas gerais"});
    }
  });
});

// Rota para obter o ranking
exports.getRanking = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const rankingSnapshot = await db.collection("ranking").get();
      const ranking = rankingSnapshot.docs.map((doc) => doc.data());
      res.status(200).json(ranking);
    } catch (error) {
      res.status(500).json({error: "Erro ao obter o ranking"});
    }
  });
});

// Rota para atualizar o ranking
exports.updateRanking = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const {nome, pontuacao} = req.body;
    console.log("Recebido o pedido de atualização do ranking");
    try {
      await db.collection("ranking").add({nome, pontuacao});
      res.status(200).json({message: "Ranking atualizado com sucesso"});
    } catch (error) {
      res.status(500).json({error: "Erro ao atualizar o ranking"});
    }
  });
});
