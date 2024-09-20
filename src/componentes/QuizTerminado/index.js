import styled from "styled-components";
import { Titulo } from "../Titulo";

const QuizTerminadoContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 50px;	
    align-items: center;
    justify-content: center;
    padding: 10px;
`

const QuizTerminado = ({ children }) => {
    return (
        <QuizTerminadoContainer>
            <Titulo 
                fundo="none"
                cor="#fff"
            >Fim!</Titulo>
            {children}
        </QuizTerminadoContainer>
    )
}

export default QuizTerminado;