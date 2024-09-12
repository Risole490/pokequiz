import styled from "styled-components";

const HeaderContainer = styled.header`
        background: none;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
`

const LogoImage = styled.img`
        width: 300px;
        height: auto;
`

const Header = () => {
    return (
        <HeaderContainer>
            <LogoImage src={`${process.env.PUBLIC_URL}/Images/LogoPKCON1.png`} alt="Logo" />
        </HeaderContainer>
    )
}

export default Header;