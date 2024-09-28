// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Para analisar o corpo das requisições como JSON

const perguntasGerais = require('./data/perguntasGerais.json'); // Atualize o caminho para o diretório 'data'
const rankingFilePath = path.join(__dirname, 'data', 'ranking.json'); // Caminho para o arquivo ranking.json

// Rota para obter perguntas gerais
app.get('/api/perguntas-gerais', (req, res) => {
    res.json(perguntasGerais);
});

// Rota para obter o ranking
app.get('/api/ranking', (req, res) => {
    fs.readFile(rankingFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ler o arquivo de ranking' });
        }

        const ranking = JSON.parse(data);
        res.status(200).json(ranking);
    });
});

// Rota para atualizar o ranking
app.post('/api/update-ranking', (req, res) => {
    const { nome, pontuacao } = req.body;

    fs.readFile(rankingFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ler o arquivo de ranking' });
        }

        let ranking = JSON.parse(data);
        ranking.push({ nome, pontuacao });

        fs.writeFile(rankingFilePath, JSON.stringify(ranking, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao atualizar o arquivo de ranking' });
            }

            res.status(200).json({ message: 'Ranking atualizado com sucesso' });
        });
    });
});

// Servir arquivos estáticos do diretório 'build'
app.use(express.static(path.join(__dirname, 'build')));

// Rota para servir o arquivo 'index.html' para qualquer rota não definida
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});