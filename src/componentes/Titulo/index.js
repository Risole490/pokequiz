import styled from "styled-components";

export const Titulo = styled.h1`
    color: ${props => props.cor || "black"};
    font-size: ${props => props.tamanho || "4rem"};
    align-self: ${props => props.alinhamento || "center"};
`;

export const Subtitulo = styled.h2`
    color: red;
    font-size: ${props => props.tamanho || "2rem"};
`;