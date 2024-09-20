import styled from "styled-components";

const FooterContainer = styled.footer`
    width: 100%;
    padding: 10px;
    background-color: #2b2d42;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FooterText = styled.p`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    font-style: italic;
    font-family: 'Arial', sans-serif;
    margin: 0;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterText>Desenvolvido por Risole490</FooterText>
        </FooterContainer>
    );
}


export default Footer;