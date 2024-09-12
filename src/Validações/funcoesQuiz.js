// funcoesQuiz.js
import { embaralharArray } from './utils';
import { extraiDadosPokemons } from '../API/poke';

export async function loadNextQuestion() {
    const isPokemonQuestion = Math.random() < 0.5; // 50% de chance de ser uma pergunta de Pokémon
    if (isPokemonQuestion) {
        const data = await extraiDadosPokemons(); // Busca os dados dos pokémons
        data.alternativas = embaralharArray(data.alternativas); // Embaralha as alternativas
        return {
            tipo: 'pokemon',
            pergunta: data.pergunta,
            alternativas: data.alternativas,
            correta: data.correto.nome,
            sprite: data.correto.sprite,
            isShiny: data.correto.sprite.includes('shiny') // Verifica se é shiny
        };
    } else {
        const response = await fetch('http://localhost:5000/api/perguntas-gerais');
        const perguntasGerais = await response.json();
        const perguntaGeral = perguntasGerais[Math.floor(Math.random() * perguntasGerais.length)];
        perguntaGeral.alternativas = embaralharArray(perguntaGeral.alternativas); // Embaralha as alternativas
        return {
            tipo: 'geral',
            pergunta: perguntaGeral.pergunta,
            alternativas: perguntaGeral.alternativas,
            correta: perguntaGeral.resposta,
            foto: perguntaGeral.foto || null // Adiciona a foto se existir
        };
    }
}