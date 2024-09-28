// funcoesQuiz.js
import { embaralharArray } from './utils';
import { extraiDadosPokemons } from '../API/poke';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';


let usedQuestions = new Set();
let usedPokemon = new Set();

export function resetQuiz() {
    usedQuestions.clear();
    usedPokemon.clear();
}

export async function loadNextQuestion() {
    const isPokemonQuestion = Math.random() < 0.5; // 50% de chance de ser uma pergunta de Pokémon
    const response = await fetch(`${API_URL}/api/perguntas-gerais`);
    const perguntasGerais = await response.json();

    if (isPokemonQuestion || usedQuestions.size >= perguntasGerais.length) {
        let data;
        do {
            data = await extraiDadosPokemons(); // Busca os dados dos pokémons
        } while (usedPokemon.has(data.correto.nome));
        
        usedPokemon.add(data.correto.nome);
        data.alternativas = embaralharArray(data.alternativas); // Embaralha as alternativas
        return {
            tipo: 'pokemon',
            pergunta: data.pergunta,
            alternativas: data.alternativas,
            correta: data.correto.nome,
            sprite: data.correto.sprite,
            isShiny: data.correto.shiny // Verifica se é shiny
        };
    } else {
        let perguntaGeral;
        do {
            perguntaGeral = perguntasGerais[Math.floor(Math.random() * perguntasGerais.length)];
        } while (usedQuestions.has(perguntaGeral.pergunta));
        
        usedQuestions.add(perguntaGeral.pergunta);
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