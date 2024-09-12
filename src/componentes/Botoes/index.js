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
        scale: ${props => props.efeitoHover || 1.1};
    }
`;

const BotaoTexto = styled.p`
    color: ${props => props.corTexto || "white"};
    font-weight: ${props => props.negrito || "normal"};
`;


const Botao = ({ onClick, children, cor, efeitoHover, style }) => {
    return (
        <BotaoStyled 
            cor={cor} 
            onClick={onClick} 
            efeitoHover={efeitoHover}
            style={style}
        >
            <BotaoTexto
                negrito="bold"
            >{children}</BotaoTexto>
        </BotaoStyled>
    )
}




export { Botao };