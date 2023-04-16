
import './App.css';
import { darkTheme, lightTheme } from "./components/Theme"
import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import Footer from './components/Footer';




const Container = styled.div`
  flex: 1;
  background-color: black;
  height: 270vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  top: 0;
  width: 100%;


  
`;
function App() {

  
  
  // takes poster_path as second part

  

  return (

     <>
       <Container style={{}}>
 <Home style={{}} />

 </Container>

 </>

  );
}

export default App;
