
import React from 'react';
import styled from "styled-components";


const Container = styled.div`
display: flex;
padding-top: 3%;
position:relative;left:-5%;
background-color: rgba(0,100,0,.3);
width: 120vw;


`;
const Wrapper = styled.div`
display:flex;
height: 84vh;

padding-right:5%;

color: white;
text-align: center;
font-size:1.4rem;
justify-content: center;
align-items:center

`


const Footer = () => {
  return (
    <Container>
      <Wrapper>  Not a product of MovieDB this is a fan project using the MovieDB API</Wrapper>

        
    </Container>
  )
}

export default Footer