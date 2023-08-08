import * as React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/chisel-logo-black.png';

const Wrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 60px;
    padding-top: 15px;
    background: linear-gradient(107deg, rgba(255,255,255,1) 0%, rgba(150,117,182,1) 90%);
    top: 0%;
`;

const BodyDiv = styled.div`
    float: left;
    margin-left: 50px;
`;

const Image = styled.img`
    margin: 0 0 10px;
`;

const Header = () => {

    return (
        <>
            <Wrapper>
                <BodyDiv>
                    <Image src={logo}></Image>
                </BodyDiv>
            </Wrapper>
        </>
    )
}


export default Header;