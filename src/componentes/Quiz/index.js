import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Subtitulo, Titulo } from "../Titulo";
import Regras from "../Regras";
import { Botao } from "../Botoes";

import { extraiDadosPokemons } from "../../API/poke";
import { QuizIniciadoContainer, QuizElementos } from '../QuizIniciado';
import { HP, TempoRestante } from '../Visuals';

const QuizContainer = styled.section`
    width: 600px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #000;
`;

function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const Quiz = () => {
    const [timer, setTimer] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [pokemonCorreto, setPokemonCorreto] = useState(null);
    const [hp, setHP] = useState(100);
    const [tempoRestante, setTempoRestante] = useState(20);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [pontuacao, setPontuacao] = useState(0);

    useEffect(() => { // Função que será executada toda vez que o componente for renderizado
        let interval; // Variável que armazenará o intervalo de tempo
        if (isStarted && timer > 0) { // Se o quiz foi iniciado e o timer é maior que 0, então inicia o intervalo
            interval = setInterval(() => { 
                setTimer(prevTimer => prevTimer - 1); // Decrementa o timer a cada 1 segundo
            }, 1000);
        } else if (timer === 0) { // Se o timer for igual a 0, então para o intervalo
            clearInterval(interval);
        }
        return () => clearInterval(interval); // Função que será executada toda vez que o componente for desmontado
    }, [isStarted, timer]); // Dependências que farão o useEffect ser executado

    useEffect(() => { // Novo useEffect para manipular o tempo restante
        let interval;
        if (isStarted && timer === 0 && tempoRestante > 0) {
            interval = setInterval(() => {
                setTempoRestante(prevTempo => prevTempo - 1);
            }, 1000);
        } else if (tempoRestante === 0) {
            clearInterval(interval);
            // Ação a ser tomada quando o tempo restante chegar a zero
            // Por exemplo, você pode parar o quiz ou mostrar uma mensagem
            console.log("Tempo esgotado!");
        }
        return () => clearInterval(interval);
    }, [isStarted, timer, tempoRestante]); // Dependências que farão o useEffect ser executado

    const startQuiz = async () => {
        setTimer(3); // Inicia o timer com 3 segundos
        setIsStarted(true); // Altera o estado para iniciado
        await loadNextPokemon(); // Carrega o primeiro Pokémon
    };

    const loadNextPokemon = async () => {
        try {
            const data = await extraiDadosPokemons(); // Busca os dados dos pokémons
            data.alternativas = embaralharArray(data.alternativas); // Embaralha as alternativas
            setQuizData(data); // Atualiza o estado com os dados dos pokémons
            setPokemonCorreto({
                nome: data.correto.nome,
                sprite: data.correto.sprite,
                isShiny: data.correto.sprite.includes('shiny') // Verifica se é shiny
            }); // Atualiza o estado com o nome do pokémon correto
            setTempoRestante(20); // Reseta o tempo restante
        } catch (error) {
            console.error(error);
        }
    };

    const handleAnswerClick = (alternativa) => {
        setSelectedAnswer(alternativa);
        const isCorrect = alternativa === pokemonCorreto.nome;
        setIsAnswerCorrect(isCorrect);
        if (isCorrect) {
            const isShiny = quizData.correto.sprite.includes('shiny');
            setPontuacao(prevScore => prevScore + (isShiny ? 3 : 1)); // Aumenta a pontuação
        } else {
            setHP(prevHP => prevHP - 5);
        }
        setTimeout(() => {
            // Avançar para o próximo Pokémon
            setSelectedAnswer(null);
            setIsAnswerCorrect(null);
            loadNextPokemon();
        }, 2000);
    };

    return (
        <QuizContainer>
            <Titulo tamanho="2rem"> Quiz do React </Titulo>
            {!isStarted && <Regras />}
            {!isStarted && <Botao cor="red" onClick={startQuiz}> Começar </Botao>}
            {isStarted && timer > 0 && <p> O quiz começará em {timer} segundos </p>}
            {isStarted && timer === 0 && quizData && 
                <QuizIniciadoContainer>
                    <QuizElementos>
                        <TempoRestante tempo={tempoRestante}/>
                        <Titulo tamanho="1.5rem"> Pontuação: {pontuacao} </Titulo>
                        <Botao cor="red"> Pular </Botao>
                    </QuizElementos>

                    <Subtitulo> {quizData.pergunta} </Subtitulo>
                    <img src={pokemonCorreto.sprite} alt={pokemonCorreto.nome} />
                    {pokemonCorreto.isShiny && '✨'}
                    <QuizElementos>
                        {quizData.alternativas.map((alternativa, index) => (
                            <Botao 
                                key={index} 
                                onClick={() => handleAnswerClick(alternativa)} 
                                corHover={"grey"}
                                style={{ 
                                    backgroundColor: selectedAnswer === alternativa 
                                    ? (isAnswerCorrect ? 'green' : 'red') 
                                    : (alternativa === pokemonCorreto && selectedAnswer !== null ? 'green' : '')
                                }}
                            >
                                {alternativa} 
                            </Botao>
                        ))}
                        <HP valor={hp} />
                    </QuizElementos>
                </QuizIniciadoContainer>
            }

        </QuizContainer>
    );
};

export default Quiz;