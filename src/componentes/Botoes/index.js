import styled from "styled-components";

const BotaoStyled = styled.button`
    background-color: ${props => props.cor || "blue"};
    color: ${props => props.corTexto || "white"};
    font-size: 1.2rem;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;
    &:hover {
        background-color: ${props => props.corHover || "orange"};
    }
`;


const Botao = ({ onClick, children, cor, corTexto, corHover }) => {
    return (
        <BotaoStyled cor={cor} onClick={onClick} corTexto={corTexto} corHover={corHover}>
            {children}
        </BotaoStyled>
    )
}




export { Botao };