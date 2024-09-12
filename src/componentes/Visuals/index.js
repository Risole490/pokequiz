import styled from "styled-components";

const VisualHPContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${props => props.padding || "10px"};
    background-color: ${props => props.backgroundColor || "#ccc"};
    border-radius: 10px;
`

const TextoErro = styled.p`
    color: red;
    font-weight: bold;
    font-family: 'Arial', sans-serif;
`

const HP = ({ valor }) => {
    return (
        <VisualHPContainer>
            <h1>HP</h1>
            <p>{valor}</p>
        </VisualHPContainer>
    )
}

const TempoRestante = ({ tempo }) => {
    return (
        <VisualHPContainer>
            <h1>Tempo Restante</h1>
            <p>{tempo}</p>
        </VisualHPContainer>
    )
}

const MensagemErro = ({ mensagem }) => {
    return (
        <VisualHPContainer>
            <TextoErro>{mensagem}</TextoErro>
        </VisualHPContainer>
    )
}

export { HP, TempoRestante, MensagemErro };