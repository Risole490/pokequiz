// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());

const perguntasGerais = require('./data/perguntasGerais.json'); // Atualize o caminho para o diretório 'data'

app.get('/api/perguntas-gerais', (req, res) => {
    res.json(perguntasGerais);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});