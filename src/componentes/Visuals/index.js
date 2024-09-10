import styled from "styled-components";

const VisualHPContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
`

const HP = ({ valor }) => {
    return (
        <VisualHPContainer>
            <h1>HP</h1>
            <p>{valor}</p>
        </VisualHPContainer>
    )
}

const TempoRestante = () => {
    return (
        <VisualHPContainer>
            <h1>Tempo Restante</h1>
            <p>10:00</p>
        </VisualHPContainer>
    )
}

export { HP, TempoRestante };