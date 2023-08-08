import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 60px;
    padding-top: 30px;
    background: linear-gradient(0deg, rgba(97,15,215,1) 0%, rgba(191,35,219,1) 100%);
    bottom: 0%;
`;

const BodyDiv = styled.div`
    float: right;
    margin-right: 50px;
`;

const Footer = () => {

    return (
        <>
            <Wrapper>
                <BodyDiv>
                    Privacy Policy
                </BodyDiv>
            </Wrapper>
        </>
    )
}


export default Footer;