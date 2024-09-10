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

const Quiz = () => {
    const [timer, setTimer] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [quizData, setQuizData] = useState(null);

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

    const startQuiz = async () => {
        setTimer(3); // Inicia o timer com 3 segundos
        setIsStarted(true); // Altera o estado para iniciado
        try {
            const data = await extraiDadosPokemons(); // Busca os dados dos pokémons
            setQuizData(data); // Atualiza o estado com os dados dos pokémons
        } catch (error) {
            console.error(error);
        }
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
                        <TempoRestante />
                        <Titulo tamanho="1.5rem"> Pontuação: 0 </Titulo>
                        <Botao cor="red"> Pular </Botao>
                    </QuizElementos>

                    <Subtitulo> {quizData.pergunta} </Subtitulo>
                    <img src={quizData.correto.sprite} alt={quizData.correto.nome} />
                    <QuizElementos>
                        {quizData.alternativas.map((alternativa, index) => (
                            <Botao key={index}> {alternativa} </Botao>
                        ))}
                        <HP valor={5} />
                    </QuizElementos>
                </QuizIniciadoContainer>
            }

        </QuizContainer>
    );
};

export default Quiz;