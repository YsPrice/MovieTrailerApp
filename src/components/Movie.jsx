import React from 'react';
import styled from 'styled-components';



const Container = styled.div`
  flex: 1;
  overscroll-behavior: auto;

  
`;
const TextWrapper = styled.h5`
display: flex;
padding: 12px;
margin-bottom:-10px;
font-size: 170%;
border: 1px solid black;
width: 76.8%;




`;

const Wrapper2 = styled.div`
flex: 1;

top: 0;
max-width: 100%;
margin-top: 0%;
padding-top: -20px;
`;
const SaveButton = styled.button`
width: 40%;
padding: 4%;
background-color: yellow;
border: 1px solid black;
border-radius: 20%;
`;
const Poster = styled.div`
display: flex;
gap: 1rem;
max-width: 700px;
margin: 2em auto;


`;
const Image = styled.img`
width: 20vw;
height: 50vh;
@media screen and (min-width: 200px) and (max-width: 1200px){
  width: 30vw;
  height: 25vh;
}
`
const Movie = ({movie, selectMovie, saveMovie, play,setPlay}) => {
       
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original"

    return ( 

       
 
        <Container style={{ flex: '1'}}>
        <Poster style={{}} onClick={() => selectMovie(movie)} >

           
              
                {movie.poster_path &&
                <Image style={{}}src={IMAGE_PATH + movie.poster_path} alt={movie.title}/>
                }
              
            </Poster>
   
        </Container> 
            
     
     
       
          
        

            
 
    ); 
  
};


export default Movie;