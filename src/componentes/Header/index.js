import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Ranking from "../Ranking";

const HeaderContainer = styled.header`
        background: none;
        display: flex;
        justify-content: space-around;
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
    );
};

export default Header;