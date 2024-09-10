import styled from "styled-components";
import { Subtitulo } from "../Titulo";

const RegrasContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
`

const Regras = () => {
    return (
        <RegrasContainer>
            <Subtitulo tamanho="1rem"> Regras do Quiz </Subtitulo>

            <ol>
                <li> Cada pergunta vale 1 ponto </li>
                <li> A cada 5 pontos você ganha um prêmio </li>
                <li> Se errar uma pergunta, você perde 1 HP </li>
            </ol>
        </RegrasContainer>
    )
}

export default Regras;
