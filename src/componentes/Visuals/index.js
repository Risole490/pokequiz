import styled from "styled-components";

const VisualHPContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 9px;
    align-items: center;
    margin-right: ${props => props.marginRight || "0px"};
    padding: ${props => props.padding || "10px"};
    background-color: ${props => props.backgroundColor || "#fff"};
    border-radius: ${props => props.borderRadius || "5px"};
    border: ${props => props.border || "none"};
`

const TextoVisual = styled.p`
    font-size: 1.2rem;
    font-weight: ${props => props.fontWeight || "bold"};
    text-align: center;
    color: ${props => props.color || "#000"};
    font-family: 'Arial', sans-serif;

    @media (min-width: 320px) and (max-width: 425px) {
        font-size: 1rem;
    }
`

const PokeballsContainer = styled.div`
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
`

const PokeballImage = styled.img`
    width: 20px;
    height: 20px;
`

const HP = ({ valor }) => {
    return (
        <VisualHPContainer 
            backgroundColor="#fff"
            marginRight="10px"
        >
            <TextoVisual color="#d00000">HP</TextoVisual>
            <TextoVisual color="#d00000">{valor}</TextoVisual>
        </VisualHPContainer>
    )
}

const TempoRestante = ({ tempo }) => {
    return (
        <VisualHPContainer padding="8px" backgroundColor="#023e8a">
            <TextoVisual color="#fff">Timer</TextoVisual>
            <TextoVisual color="#fff">{tempo}</TextoVisual>
        </VisualHPContainer>
    )
}

const SkipPokeballs = ({ pokeballsCount }) => {
    return (
        <PokeballsContainer>
            {Array(pokeballsCount).fill("/Images/Gerais/pokeball.png").map((src, index) => (
                <PokeballImage key={index} src={src} alt="Pokeball" />
            ))}
        </PokeballsContainer>
    );
};

const MensagemErro = ({ mensagem }) => {
    return (
        <VisualHPContainer>
            <TextoVisual color="red">{mensagem}</TextoVisual>
        </VisualHPContainer>
    )
}

export { HP, TempoRestante, MensagemErro, SkipPokeballs };