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
    background-color: rgba(0, 0, 20, 0.6);
    border-radius: 10px;
    width: 100%;
    height: 100%;
    align-items: center;
    padding: 10px 0px;
    justify-content: ${props => props.justify || "center"};
`

const ImagemQuiz = styled.img`
    width: ${props => props.width || "450px"};
    height: ${props => props.height || "450px"};

    @media (min-width: 320px) and (max-width: 370px) {
        width: 280px;
        height: 100%;
    } 

    @media (min-width: 371px) and (max-width: 425px) {
        width: 300px;
        height: 100%;
    }
    
    @media (min-width: 426px) and (max-width: 768px) {
        width: 390px;
        height: 100%;
    }
`

const AlternativasContainer = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    align-items: center;

    @media (min-width: 320px) and (max-width: 425px) {
        flex-direction: column;
    }
`

export { QuizIniciadoContainer, QuizElementos, ImagemQuiz, AlternativasContainer };