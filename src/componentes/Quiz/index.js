import React, { useState, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { loadNextQuestion } from '../../Validações/funcoesQuiz'; // Importa a função de carregamento de perguntas


import { Subtitulo, Titulo } from "../Titulo";
import Regras from "../Regras";
import { Botao, SkipContainer } from "../Botoes";

import { QuizIniciadoContainer, QuizElementos, ImagemQuiz, AlternativasContainer } from '../QuizIniciado';
import { HP, TempoRestante, MensagemErro, SkipPokeballs } from '../Visuals';
import { Input } from '../Inputs';
import Ranking from '../Ranking';
import QuizTerminado from '../QuizTerminado';

const QuizContainer = styled.section`
    // background-color: rgba(0, 0, 20, 0.6); /* Cor com opacidade */
    width: 700px;
    height: 100vh;
    box-sizing: border-box;
    margin-top: 11em;
    display: flex;
    gap: 0;
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
    const [rankingAtualizado, setRankingAtualizado] = useState(false);
    const [alternativasDesabilitadas, setAlternativasDesabilitadas] = useState(false);
    const [pokeballsCount, setPokeballsCount] = useState(3);
    const [isSkipping, setIsSkipping] = useState(false);

    // Função para pular a pergunta, decrementando o contador de pokebolas e carregando a próxima pergunta
    const handleSkip = () => {
        if (pokeballsCount > 0 && !isSkipping) {
            setPokeballsCount(pokeballsCount - 1);
            setIsSkipping(true);
            setTimeout(() => {
                setIsSkipping(false);
            }, 1000); // 1 segundo de atraso
            loadNextQuestion().then(setQuizData);
        }
    };

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
            handleFinishQuiz();
        }
    }, [hp]);

    const handleAnswerClick = (alternativa) => {
        if (alternativasDesabilitadas) return; // Se os botões estiverem desabilitados, não faça nada

        setSelectedAnswer(alternativa);
        const isCorrect = alternativa === quizData.correta;
        setIsAnswerCorrect(isCorrect);
        setAlternativasDesabilitadas(true); // Desabilita os botões após a seleção

        if (isCorrect) {
            const isShiny = quizData.tipo === 'pokemon' && quizData.isShiny;
            setPontuacao(prevPontuacao => prevPontuacao + (isShiny ? 3 : 1));
        } else {
            setHp(prevHP => {
                const newHP = prevHP - 5;
                if (newHP <= 0) {
                    setQuizTerminado(true);
                    setIsStarted(false);
                    console.log('Chamando handleFinishQuiz LINHA 121');
                    handleFinishQuiz();
                }
                return newHP;
            });
        }
        const timeout = setTimeout(() => {
            setSelectedAnswer(null);
            setIsAnswerCorrect(null);
            setAlternativasDesabilitadas(false); // Habilita os botões para a próxima pergunta
            if (!quizTerminado) {
                loadNextQuestion().then(setQuizData);
            }
        }, 200);
    
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
        setQuizTerminado(false);
        setPontuacao(0);
        setHp(100);
        setRankingAtualizado(false);
        setSelectedAnswer(null);
        setIsAnswerCorrect(false);
        setTempoTotal(999);
        setIsStarted(true);
        setTimer(5);
        setAlternativasDesabilitadas(false); // Habilita os botões de alternativas
    };

    const resetQuiz = () => {
        setIsStarted(false);
        setQuizTerminado(false);
        setNome('');
        setPontuacao(0);
        setHp(100);
        setTempoTotal(120);
        setPokeballsCount(3);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        setAlternativasDesabilitadas(false);
        setRanking([]);
        setErrorMessage('');
    };

    const fetchRanking = async () => {
        try {
            const response = await fetch('https://getranking-eiqiamgogq-uc.a.run.app', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar o ranking');
            }
            const data = await response.json();
            setRanking(data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar o ranking:', error);
        }
    };

    const handleFinishQuiz = useCallback(async () => {
        if (!rankingAtualizado) {
            await updateRanking(nome, pontuacao);
            const ranking = await fetchRanking();
            setRanking(ranking);
            setRankingAtualizado(true);
        }
    }, [nome, pontuacao, rankingAtualizado]);

    useEffect(() => {
        let interval;
        if (isStarted && tempoTotal > 0) {
            interval = setInterval(() => {
                setTempoTotal(prevTempo => prevTempo - 1);
            }, 1000);
        } else if (tempoTotal === 0 && !quizTerminado) {
            clearInterval(interval);
            setIsStarted(false);
            setQuizTerminado(true);
            handleFinishQuiz();
        }
        return () => clearInterval(interval);
    }, [isStarted, tempoTotal, quizTerminado, handleFinishQuiz]);

    async function updateRanking(nome, pontuacao) {
        try {
            const response = await fetch('https://updateranking-eiqiamgogq-uc.a.run.app', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, pontuacao }),
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar o ranking');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao atualizar o ranking:', error);
        }
    };

    return (
        <QuizContainer>
            {!isStarted && !quizTerminado && <Regras />}
            {!isStarted && !quizTerminado && <Input type="text" placeholder="Digite seu nome" onBlur={handleBlur}/>}
            {errorMessage && <MensagemErro mensagem={errorMessage} />} {/* Exibe a mensagem de erro */}
            {!isStarted && !quizTerminado && <Botao cor="rgba(0, 0, 20, 0.6)" onClick={startQuiz}> Começar </Botao>}
            {isStarted && timer > 0 && <Subtitulo margem="50px" cor="#fff"> O quiz começará em {timer} segundos </Subtitulo>}
            {isStarted && timer === 0 && quizData && 
                <QuizIniciadoContainer>
                    <QuizElementos
                        justify="space-around"
                    >
                        <TempoRestante 
                            tempo={`${Math.floor(tempoTotal / 60)}:${(tempoTotal % 60).toString().padStart(2, '0')}`}
                        />
                        <Titulo 
                            largura="auto"
                            tamanho="1.5rem"
                            negrito="bold"
                            fundo="none"
                            cor="#fff"
                        > Pontuação: {pontuacao} </Titulo>
                        <SkipContainer>
                            <Botao 
                                cor="red"
                                onClick={handleSkip}
                                disabled={isSkipping}
                            > Pular </Botao>
                            <SkipPokeballs  pokeballsCount={pokeballsCount}/>
                        </SkipContainer>
                    </QuizElementos>
                    
                    {quizData.tipo === 'pokemon' && <ImagemQuiz src={quizData.sprite} alt={quizData.correta} />}
                    {quizData.tipo === 'pokemon' && <p style={{fontSize: '2rem'}}>{quizData.isShiny && '✨'}</p>}
                    {quizData.tipo === 'geral' && quizData.foto && 
                    <ImagemQuiz
                        width={"250px"}
                        height={"500px"}
                        src={quizData.foto} 
                        alt="Pergunta Geral" 
                    />}
                    {quizData.tipo === 'geral' && (
                            <Subtitulo margem="1em" padding="5px" cor="#fff" fundo="rgba(0, 0, 20, 0.6)"> {quizData.pergunta} </Subtitulo>
                    )}
                    <QuizElementos
                        justify=""
                    >   
                        <AlternativasContainer>
                        {quizData.alternativas.map((alternativa, index) => (
                            <Botao 
                                key={index}
                                cor={"#023e8a"}
                                onClick={() => handleAnswerClick(alternativa)} 
                                corHover={"grey"}
                                disabled={alternativasDesabilitadas} // Desabilita o botão se alternativasDesabilitadas for true
                                style={{ 
                                    backgroundColor: selectedAnswer === alternativa 
                                    ? (isAnswerCorrect ? 'green' : 'red') 
                                    : (alternativa === quizData.correta && selectedAnswer !== null ? 'green' : '')
                                }}
                            >
                                {alternativa} 
                            </Botao>
                        ))}
                        </AlternativasContainer>
                        <HP valor={hp} />
                    </QuizElementos>
                </QuizIniciadoContainer>
            }
            {quizTerminado && (
                <QuizTerminado>
                    <Subtitulo
                        negrito="bold"
                        cor="#fff"
                        fundo="#2b2d42"
                        padding="10px"
                        borderRadius="5px"
                    >Sua pontuação: {pontuacao}</Subtitulo>
                    <Ranking ranking={ranking} />
                    <Botao cor="#2b2d42" onClick={resetQuiz}> Jogar Novamente </Botao>
                </QuizTerminado>
            )}
        </QuizContainer>
    );
};

export default Quiz;