import styled from "styled-components";
import { Titulo } from "../Titulo";

const HeaderContainer = styled.header`
        background-color: #FFF;
        display: flex;
        justify-content: center;
        border: 1px solid #000;
        width: 100vw;
`

const Header = () => {
    return (
        <HeaderContainer>
            <Titulo>Meu Banner</Titulo>
        </HeaderContainer>
    )
}

export default Header;