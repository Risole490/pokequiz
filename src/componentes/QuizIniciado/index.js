import styled from "styled-components";

const QuizIniciadoContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding: 10px;
`

const QuizElementos = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: ${props => props.justify || "center"};
    padding: 10px 20px;
    background-color: #2b2d42;
    border-radius: 5px;
`

const ImagemQuiz = styled.img`
    width: 500px;
    height: 100%;
`

const AlternativasContainer = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
`

export { QuizIniciadoContainer, QuizElementos, ImagemQuiz, AlternativasContainer };