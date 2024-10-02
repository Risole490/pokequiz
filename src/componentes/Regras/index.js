import styled from "styled-components";
import { Subtitulo } from "../Titulo";

const RegrasContainer = styled.div`
    display: flex;
    width: 80%;
    margin: 30px 0px 20px 0px;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    gap: 10px;
    background-color: rgba(0, 0, 20, 0.6);;
    border-radius: 10px;
`

const ListaRegras = styled.ol`
    max-width: 85%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 20px;
    list-style-type: decimal;
`

const ItemRegras = styled.li`
    font-size: 1.2rem;
    font-weight: 500;
    font-family: 'Work Sans', sans-serif;
    font-weight: 400;
    color: #fff;
`

const Regras = () => {
    return (
        <RegrasContainer>
            <Subtitulo tamanho="1.5rem" negrito="bold" cor="#e63946" > Regras do Quiz </Subtitulo>

            <ListaRegras>
                <ItemRegras>O quiz possui perguntas gerais sobre a franquia, tanto o anime quanto os jogos. E claro, os próprios pokémons!</ItemRegras>
                <ItemRegras>Você terá 2 minutos e 100 de HP para acertar o máximo de perguntas.</ItemRegras>
                <ItemRegras>3 tentativas de pular a questão se necessário.</ItemRegras>
                <ItemRegras>Cada acerto ganha um ponto(shiny ganha 3) e cada erro perde 5 de HP.</ItemRegras>
                <ItemRegras>Se tiver sorte, rodadas bônus aparecerão com apenas 3 alternativas!</ItemRegras>
                <ItemRegras>O quiz acaba quando o timer acabar ou seu HP chegar a 0.</ItemRegras>
            </ListaRegras>
        </RegrasContainer>
    )
}

export default Regras;
