import React, { useState, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { loadNextQuestion, resetQuiz } from '../../Validações/funcoesQuiz'; // Importa a função de carregamento de perguntas


import { Subtitulo, Titulo } from "../Titulo";
import Regras from "../Regras";
import { Botao } from "../Botoes";

import { QuizIniciadoContainer, QuizElementos } from '../QuizIniciado';
import { HP, TempoRestante, MensagemErro } from '../Visuals';
import { Input } from '../Inputs';
import Ranking from '../Ranking';

const QuizContainer = styled.section`
    background: radial-gradient(circle, rgba(0,42,255,1) 0%, rgba(252,70,70,1) 100%);
    padding: 0px 10px;
    width: 600px;
    height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
`;

const Quiz = () => {
    const [timer, setTimer] = useState(5);
    const [isStarted, setIsStarted] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [hp, setHp] = useState(100);
    const [tempoTotal, setTempoTotal] = useState(120);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [pontuacao, setPontuacao] = useState(0);
    const [quizTerminado, setQuizTerminado] = useState(false);
    const [nome, setNome] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagem de erro
    const [ranking, setRanking] = useState([]); // Estado para o ranking


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
            setIsStarted(false);
            setQuizTerminado(true);
        }
        return () => clearInterval(interval);
    }, [isStarted, tempoTotal]);

    useEffect(() => {
        if (isStarted && timer === 0) {
            const fetchQuestion = async () => {
                const nextQuestion = await loadNextQuestion();
                setQuizData(nextQuestion);
            };

            fetchQuestion();
        }
    }, [isStarted, timer]);

    useEffect(() => {
        if (hp <= 0) {
            setQuizTerminado(true);
            setIsStarted(false);
        }
    }, [hp]);

    const handleAnswerClick = (alternativa) => {
        setSelectedAnswer(alternativa);
        const isCorrect = alternativa === quizData.correta;
        setIsAnswerCorrect(isCorrect);
        if (isCorrect) {
            const isShiny = quizData.tipo === 'pokemon' && quizData.isShiny;
            setPontuacao(prevPontuacao => prevPontuacao + (isShiny ? 3 : 1));
        } else {
            setHp(prevHP => {
                const newHP = prevHP - 5;
                if (newHP <= 0) {
                    setQuizTerminado(true);
                    setIsStarted(false);
                }
                return newHP;
            });
        }
        const timeout = setTimeout(() => {
            setSelectedAnswer(null);
            setIsAnswerCorrect(null);
            if (!quizTerminado) {
                loadNextQuestion().then(setQuizData);
            }
        }, 1000);
    
        return () => clearTimeout(timeout); // Limpa o timeout quando o componente é desmontado
    };

    const handleBlur = (event) => {
        setNome(event.target.value);
    };

    const startQuiz = async () => {
        if (!nome) {
            setErrorMessage('Por favor, preencha seu nome antes de começar o quiz.');
            return;
        }
        setErrorMessage(''); // Limpa a mensagem de erro se o nome estiver preenchido
        resetQuiz();
        setQuizTerminado(false);
        setPontuacao(0);
        setHp(100);
        setSelectedAnswer(null);
        setIsAnswerCorrect(false);
        setTempoTotal(120);
        setIsStarted(true);
        setTimer(5);
        await loadNextQuestion().then(setQuizData);
    };

    const updateRanking = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/api/update-ranking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, pontuacao }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar o ranking');
            }

            console.log('Ranking atualizado com sucesso');

            // Obter o ranking atualizado
            const rankingResponse = await fetch('http://localhost:5000/api/ranking');
            const rankingData = await rankingResponse.json();
            setRanking(rankingData); // Atualiza o estado do ranking

        } catch (error) {
            console.error('Erro ao atualizar o ranking', error);
        }
    }, [nome, pontuacao]);

    useEffect(() => {
        if (quizTerminado) {
            updateRanking();
        }
    }, [quizTerminado, updateRanking]);

    return (
        <QuizContainer>
            <Titulo 
                tamanho="2.5rem" 
                negrito="bold"
                fundo="#2b2d42"
                cor="white"
            > PokéQuiz! </Titulo>
            {!isStarted && !quizTerminado && <Regras />}
            {!isStarted && !quizTerminado && <Input type="text" placeholder="Digite seu nome" onBlur={handleBlur}/>}
            {errorMessage && <MensagemErro mensagem={errorMessage} />} {/* Exibe a mensagem de erro */}
            {!isStarted && !quizTerminado && <Botao cor="#2b2d42" onClick={startQuiz}> Começar </Botao>}
            {isStarted && timer > 0 && <Subtitulo margem="50px" cor="#fff"> O quiz começará em {timer} segundos </Subtitulo>}
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
                    <Titulo tamanho="2rem"> Fim do quiz! </Titulo>
                    <p>Sua pontuação: {pontuacao}</p>
                    <Botao cor="red" onClick={startQuiz}> Jogar Novamente </Botao>
                    <Ranking ranking={ranking} />
                </div>
            )}
        </QuizContainer>
    );
};

export default Quiz;