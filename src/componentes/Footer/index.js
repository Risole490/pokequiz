import styled from "styled-components";

const FooterContainer = styled.footer`
    width: 250px;
    padding: 5px;
    position: fixed;
    bottom: 0;
    right: 0;
`;

const FooterText = styled.p`
    color: #fff;
    font-size: 15px;
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