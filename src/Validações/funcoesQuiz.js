// funcoesQuiz.js
import { embaralharArray } from './utils';
import { extraiDadosPokemons } from '../API/poke';
import { db, authenticate} from '../firebaseclientConfig';
import { collection, getDocs } from 'firebase/firestore';

let usedQuestions = new Set();
let usedPokemon = new Set();

export function resetQuiz() {
    usedQuestions.clear();
    usedPokemon.clear();
}

export async function loadNextQuestion() {
    await authenticate(); // Ensure the user is authenticated before accessing Firestore

    const isPokemonQuestion = Math.random() < 0.5; // 50% de chance de ser uma pergunta de Pokémon
    // Buscar perguntas gerais do Firestore
    const perguntasGeraisSnapshot = await getDocs(collection(db, 'perguntasGerais'));
    const perguntasGerais = perguntasGeraisSnapshot.docs.map(doc => doc.data());

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

        console.log(perguntaGeral.resposta);
        
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