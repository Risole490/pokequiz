import styled from "styled-components";

const QuizIniciadoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
`

const QuizElementos = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: ${props => props.justify || "center"};
`

const ImagemQuiz = styled.img`
    width: 450px;
    height: 450px;
`

const AlternativasContainer = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    align-items: center;
`

export { QuizIniciadoContainer, QuizElementos, ImagemQuiz, AlternativasContainer };