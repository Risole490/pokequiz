import styled from "styled-components";

const BotaoStyled = styled.button`
    background-color: ${props => props.cor || "blue"};
    color: ${props => props.corTexto || "white"};
    font-size: 1.2rem;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;
    &:hover {
        scale: ${props => props.efeitoHover || 1.1};
    }

    @media (min-width: 320px) and (max-width: 425px) {
        padding: 10px 15px;
    }
`;

const BotaoTexto = styled.p`
    color: ${props => props.corTexto || "white"};
    font-weight: ${props => props.negrito || "normal"};
    font-family: 'Play', sans-serif;
    font-size: ${props => props.tamanho || "1.3rem"};

    @media (min-width: 320px) and (max-width: 425px) {
        font-size: 1rem;
    }
`;

const SkipContainer = styled.div`
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;


const Botao = ({ onClick, children, cor, efeitoHover, style, disabled }) => {
    return (
        <BotaoStyled 
            cor={cor} 
            onClick={onClick} 
            efeitoHover={efeitoHover}
            disabled={disabled}
            style={style}
        >
            <BotaoTexto
                negrito="bold"
            >{children}</BotaoTexto>
        </BotaoStyled>
    )
}




export { Botao, SkipContainer };