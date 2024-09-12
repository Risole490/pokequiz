import styled from "styled-components";
import { Subtitulo } from "../Titulo";

const RegrasContainer = styled.div`
    display: flex;
    margin: 30px 0px 20px 0px;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    gap: 10px;
    background-color: #2b2d42;
    border-radius: 10px;
`

const ListaRegras = styled.ol`
    max-width: 80%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 20px;
    list-style-type: decimal;
`

const ItemRegras = styled.li`
    font-size: 1rem;
    font-weight: 500;
    font-family: Arial;
    color: #fff;
`

const Regras = () => {
    return (
        <RegrasContainer>
            <Subtitulo tamanho="1.5rem" negrito="bold" cor="#e63946" > Regras do Quiz </Subtitulo>

            <ListaRegras>
                <ItemRegras> Lorem ipsum odor amet, consectetuer adipiscing elit. </ItemRegras>
                <ItemRegras> Lorem ipsum odor amet, consectetuer adipiscing elit. Turpis nec </ItemRegras>
                <ItemRegras> Lorem ipsum odor amet, consectetuer adipiscing elit. Turpis nec </ItemRegras>
                <ItemRegras> Lorem ipsum odor amet, consectetuer adipiscing elit. Turpis nec </ItemRegras>
                <ItemRegras> Lorem ipsum odor amet, consectetuer adipiscing elit. </ItemRegras>
                <ItemRegras> Lorem ipsum odor amet, consectetuer adipiscing elit. </ItemRegras>
            </ListaRegras>
        </RegrasContainer>
    )
}

export default Regras;
