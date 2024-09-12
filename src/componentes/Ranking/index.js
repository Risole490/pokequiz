import styled from "styled-components";

const RankingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin: 20px;
`

const RankingItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    padding: 10px;
    background-color: #2b2d42;
    border-radius: 10px;
    color: #fff;
`

const Ranking = ({ ranking }) => {
    // Sort the ranking data in descending order based on the pontuacao
    const sortedRanking = [...ranking].sort((a, b) => b.pontuacao - a.pontuacao);

    return (
        <RankingContainer>
            <h2>Ranking</h2>
            <ul>
                {sortedRanking.map((item, index) => (
                    <RankingItem key={index}>
                        {item.nome}: {item.pontuacao}
                    </RankingItem>
                ))}
            </ul>
        </RankingContainer>
    );
};

export default Ranking;