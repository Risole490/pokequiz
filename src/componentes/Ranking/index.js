import styled from "styled-components";
import { Titulo } from "../Titulo";

const RankingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin: 20px;
`

const RankingItems = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    list-style: none;
`

const RankingItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #2b2d42;
    border-radius: 10px;
    font-weight: bold;
    font-family: 'Arial', sans-serif;
    color: #fff;
`

const Ranking = ({ ranking }) => {
    // Sort the ranking data in descending order based on the pontuacao
    const sortedRanking = [...ranking].sort((a, b) => b.pontuacao - a.pontuacao);

    return (
        <RankingContainer>
            <Titulo
                fundo="none"
                cor="#fff"
                tamanho="2rem"
            >🏆 Ranking 🏆</Titulo>
            <RankingItems>
                {sortedRanking.map((item, index) => (
                    <RankingItem key={index}>
                        {item.nome}: {item.pontuacao}
                    </RankingItem>
                ))}
            </RankingItems>
        </RankingContainer>
    );
};

export default Ranking;