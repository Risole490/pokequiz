import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import { loadNextQuestion } from '../../Validações/funcoesQuiz'; // Importa a função de carregamento de perguntas


import { Subtitulo, Titulo } from "../Titulo";
import Regras from "../Regras";
import { Botao } from "../Botoes";

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

const Quiz = () => {
    const [timer, setTimer] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [hp, setHP] = useState(100);
    const [tempoTotal, setTempoTotal] = useState(120);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [pontuacao, setPontuacao] = useState(0);
    const [quizTerminado, setQuizTerminado] = useState(false);

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

    useEffect(() => {
        let interval;
        if (isStarted && tempoTotal > 0) {
            interval = setInterval(() => {
                setTempoTotal(prevTempo => prevTempo - 1);
            }, 1000);
        } else if (tempoTotal === 0) {
            clearInterval(interval);
            console.log("Tempo do quiz esgotado!");
            setIsStarted(false);
            setQuizTerminado(true);
        }
        return () => clearInterval(interval);
    }, [isStarted, tempoTotal]);

    const startQuiz = async () => {
        setTimer(3);
        setIsStarted(true);
        setTempoTotal(120);
        setQuizTerminado(false);
        setPontuacao(0);
        await loadNextQuestion().then(setQuizData);
    };

    const handleAnswerClick = (alternativa) => {
        setSelectedAnswer(alternativa);
        const isCorrect = alternativa === quizData.correta;
        setIsAnswerCorrect(isCorrect);
        if (isCorrect) {
            const isShiny = quizData.tipo === 'pokemon' && quizData.isShiny;
            setPontuacao(prevPontuacao => prevPontuacao + (isShiny ? 3 : 1));
        } else {
            setHP(prevHP => prevHP - 5);
        }
        setTimeout(() => {
            setSelectedAnswer(null);
            setIsAnswerCorrect(null);
            loadNextQuestion().then(setQuizData);
        }, 1000);
    };

    return (
        <QuizContainer>
            <Titulo tamanho="2rem"> Quiz do React </Titulo>
            {!isStarted && !quizTerminado && <Regras />}
            {!isStarted && !quizTerminado && <Botao cor="red" onClick={startQuiz}> Começar </Botao>}
            {isStarted && timer > 0 && <p> O quiz começará em {timer} segundos </p>}
            {isStarted && timer === 0 && quizData && 
                <QuizIniciadoContainer>
                    <QuizElementos>
                        <TempoRestante 
                            tempo={`${Math.floor(tempoTotal / 60)}:${(tempoTotal % 60).toString().padStart(2, '0')}`}
                        />
                        <Titulo tamanho="1.5rem"> Pontuação: {pontuacao} </Titulo>
                        <Botao cor="red"> Pular </Botao>
                    </QuizElementos>

                    <Subtitulo> {quizData.pergunta} </Subtitulo>
                    {quizData.tipo === 'pokemon' && <img src={quizData.sprite} alt={quizData.correta} />}
                    {quizData.tipo === 'pokemon' && <p>{quizData.isShiny && '✨'}</p>}
                    {quizData.tipo === 'geral' && quizData.foto && <img src={quizData.foto} alt="Pergunta Geral" />}
                    <QuizElementos>
                        {quizData.alternativas.map((alternativa, index) => (
                            <Botao 
                                key={index} 
                                onClick={() => handleAnswerClick(alternativa)} 
                                corHover={"grey"}
                                style={{ 
                                    backgroundColor: selectedAnswer === alternativa 
                                    ? (isAnswerCorrect ? 'green' : 'red') 
                                    : (alternativa === quizData.correta && selectedAnswer !== null ? 'green' : '')
                                }}
                            >
                                {alternativa} 
                            </Botao>
                        ))}
                        <HP valor={hp} />
                    </QuizElementos>
                </QuizIniciadoContainer>
            }
            {quizTerminado && (
                <div>
                    <Titulo tamanho="2rem"> Tempo Esgotado! </Titulo>
                    <p>Sua pontuação: {pontuacao}</p>
                    <Botao cor="red" onClick={startQuiz}> Jogar Novamente </Botao>
                </div>
            )}
        </QuizContainer>
    );
};

export default Quiz;