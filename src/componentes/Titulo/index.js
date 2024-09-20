import styled from "styled-components";

export const Titulo = styled.h1`
    width: ${props => props.largura || "100%"};
    border-radius: ${props => props.borderRadius || "5px"};
    padding: 5px;
    background-color: ${props => props.fundo || "white"};
    text-align: ${props => props.alinhamento || "center"};
    border: ${props => props.borda || "none"};
    color: ${props => props.cor || "black"};
    font-size: ${props => props.tamanho || "4rem"};
    align-self: ${props => props.alinhamento || "center"};
    font-weight: ${props => props.negrito || "normal"};
    font-family: ${props => props.fonte || "Arial"};
`;

export const Subtitulo = styled.h2`
    margin-top: ${props => props.margem || "0px"};
    color: ${props => props.cor || "black"};
    background-color: ${props => props.fundo || "none"};
    padding: ${props => props.padding || "0px"};
    border-radius: ${props => props.borderRadius || "0px"};
    font-size: ${props => props.tamanho || "2rem"};
    font-weight: ${props => props.negrito || "normal"};
    font-family: ${props => props.fonte || "Arial"};
    background: ${props => props.gradiente || null};
    -webkit-background-clip: ${props => props.clip || null};
    -webkit-text-fill-color: ${props => props.fill || null};
`;