import styled from "styled-components";
import Quiz from "./componentes/Quiz";
import './reset.css';
import Footer from "./componentes/Footer";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: url('/Images/Gerais/Fundo.jpg') no-repeat center center;
  background-size: cover;

  @media (max-width: 768px) {
    
  }
`

function App() {
  return (
    <AppContainer>
      {/* <Header /> */}
      <Quiz />
      <Footer />
    </AppContainer>
  );
}

export default App;
