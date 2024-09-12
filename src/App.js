import styled from "styled-components";
import Header from "./componentes/Header";
import Quiz from "./componentes/Quiz";
import './reset.css';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

function App() {
  return (
    <AppContainer>
      <Header />
      <Quiz />
    </AppContainer>
  );
}

export default App;
