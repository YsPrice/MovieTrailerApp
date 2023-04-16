import React , { Component } from 'react'
import styled from 'styled-components';
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Youtube from 'react-youtube';
import Movie from '../components/Movie';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import Footer from '../components/Footer';
// _______________________________________



const sizes = {
  "mobileS": '200px',
 "mobileM": '375px',
  "mobileL": '425px',
 "tablet": '768px',
 "laptop": '1024px',
 "laptopL": '1440px',
 "desktop": '2000px',
};
export const devices = {
 "mobileS": `(min-width: ${sizes.mobileS})`,
  "mobileM": `(min-width: ${sizes.mobileM})`,
 "mobileL": `(min-width: ${sizes.mobileL})`,
 "tablet": `(min-width: ${sizes.tablet})`,
  "laptop": `(min-width: ${sizes.laptop})`,
  "laptopL": `(min-width: ${sizes.laptopL})`,
  "desktop": `(min-width: ${sizes.desktop})`,
};
const Container = styled.div`
  flex: 1;
  scale:1;
  overflow:hidden;
  background-color: black;
  font-size: 14px;
  top: 0;
  justify-content: space-between;
  width: 100%;
`;
const SearchCont = styled.div`
display:flex;
flex: 1;
width: 170%;
position:relative;left:40%;
height: 25vh;
max-height: 50vh;

`;
const Border = styled.div`
display:flex;
width: 100%;
height: 79.7vh;
background-color: rgba(0,0,0,.3);
border: 1px transparent, black;
border-radius: 8%;
padding: 2%;
padding-left: 2%;
`;
const MovieContainer = styled.div`
border: 1px solid black;
position:relative;left:-1.2%;
display:flex;
justify-content:center;
padding-left:3%;
width:100%;
overflow: hidden;
background-color: transparent;

`;
const RenderCont = styled.div`
display: grid;
gap: 23%, 6%;
  grid-row-start: 1;
  grid-row-end: 3;


`;
const Box = styled.div`
  border: 1px solid black;
  border-radius: 10%;
  width:50%;
  height: 50vh;
  padding:5%;
  background-size: 120%, 180%;
  width:50%;
  height:75vh; 
  position:center;
`;
const Title= styled.h1`
  display: flex;
  text-align:center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 10000;
  color: black;
 @media(${devices.mobileL}){
   font-size:1rem;
 }
  }
`;
const Title2= styled.h1`
  display: block;
  text-align:center;
position:relative;left:10%; top:-10%;
  font-size: 3rem;
  font-weight: 10000;
  width:150%;
  color:white;

  @media(${devices.mobileS})
  {
    font-size:1.5rem;
    position:relative;left:1%; top:10%;
  }
  @media(${devices.mobileM}){
    font-size:1.6rem;
    display:flex;
    position:relative;left:17%; top:10%;
  }
  @media(${devices.mobileL}){
    font-size:1.8rem;
    display:flex;
    position:relative;left:19%; top:10%;
  }
  @media(${devices.tablet}){
    font-size:2.4rem;
    display:flex;
    position:relative;left:19%; top:1%;
  }
  @media(${devices.laptop}){
    font-size:2.6rem;
    display:flex;
    position:relative;left:19%; top:-10%;
  }
  @media(${devices.laptopL}){
    font-size:3rem;
    display:flex;
    
    position:relative;left:17%; top:-5%;

  }
  @media(${devices.desktop}){
    font-size:3.5rem;
  }
`;

const SearchButton = styled.button`

height: 8vh;
color:white;
background-color:green;
position:relative;
`;
const Input = styled.input`
border: 1px solid black;
width: 48%;
font-size: 1.6em;
border-radius:.5rem;
`;
const Modal = styled.div`
    z-index: auto;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width:100vw;
    background: rgba(0,0,0,0.9);
`;
const SubTitleCont = styled.div`
width:96vw;
max-width:109vw;
margin-right:auto;
height:86vh;
::-webkit-scrollbar {
  background-color:green;
  width:20px;
}
::-webkit-scrollbar-button{
  color:red;
}
position:relative;top:-3%; left:29%;
overflow:scroll;
`;

const SubTitle = styled.h2`
display: inline;
width:180%;
height:40vh;

justify-content: center;
align-items:end;
font-size: 1.7rem;
font-weight: 1000;
color: white;

padding: 1.3%;


`;

const Form = styled.form`
display:flex;
height:8vh;
width:50vw;
`;
const Button = styled.button`
position: relative; bottom:-55%;right:60%;
border:1px transparent;
border-radius:1rem;
padding:5%;
height:17vh;

`;
const Close = styled.button`


`

// _________________________________________________________________

const Home = () => {
  const MOVIE_API = 'https://api.themoviedb.org/3/';
  const SEARCH_API = MOVIE_API + 'search/movie';
  const DISCOVER_API = MOVIE_API + 'discover/movie';
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original"

  
  // takes poster_path as second part
  const [play, setPlay] = useState(false);
  const [open, setOpen] = useState(false)
  const [trailer, setTrailer] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [movie, setMovie] = useState({title: "Loading Content!"});
// _________________________________________________________________________

  useEffect(()=> {
    fetchMovies()
    
  },[]);

  const fetchMovies = async (e) => {
    if(e){
      e.preventDefault()
    }
    const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API }`, {
      params: {
        api_key: API_KEY,
        query: searchKey
      }
    });
    // console.log(data.results[0])
    setMovies(data.results);
    setMovie(data.results[0]);
    if(data.results.length){
      await fetchMovie(data.results[0].id);
    }
  };


  const fetchMovie = async (id) => {
    const {data} = await axios.get(`${MOVIE_API}movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos"
      }
    })
    if (data.videos && data.videos.results){
      const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
      setTrailer(trailer ? trailer: data.videos.results[0])
    }
    setMovie(data);
  };

  const renderMovies = () => (
    movies.map(movie => (
        <Movie
            selectMovie={selectMovie}
            key={movie.id}
            movie={movie}
        />)));

  const selectMovie = (movie) => {
    fetchMovie(movie.id)
    setPlay(false);
    setMovie(movie);
    window.scrollTo(0,200);
  };
// ________________________________________________

  return  (
    <Container>
<Container>

<Title style={{color:'white', marginLeft:'.8%', fontSize:'2.9em'}}>Movie trailer app</Title>
<SearchCont style={{}}>
  <Form onSubmit={fetchMovies}>
    
    <Input type="text" id="search" placeholder="search for a movie trailer"onInput={(e)=> setSearchKey(e.target.value)}/>
    <SearchButton type="submit">
    <SearchIcon />
      </SearchButton>
  </Form>

</SearchCont>

<>
{movies.length ?
    <MovieContainer>
      { movie  ? 
      <Box style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${IMAGE_PATH}${movie.backdrop_path})`}}>
      { play ?  <>

      <Modal>
      <Youtube style={{height:'70vh', width:'50%', marginLeft:'28%', marginTop:'3%'}}
                                            videoId={trailer.key}
                                            className={"youtube amru"}
                                            containerClassName={"youtube-container amru"}
                                            opts={
                                                {
                                                    width: '100%',
                                                    height: '120%',
                                                    playerVars: {
                                                        autoplay: 1,
                                                        controls: 0,
                                                        cc_load_policy: 0,
                                                        fs: 0,
                                                        iv_load_policy: 0,
                                                        modestbranding: 0,
                                                        rel: 0,
                                                        showinfo: 0,
                                                    },
                                                }
                                            }
                                         />
                                         <Close style={{
                                           backgroundColor:'transparent',
                                           color:'white',
                                           fontSize:'1.7rem',
                                           marginLeft: '43%', 
                                           padding:'1.2%',
                                           width:'20%', 
                                           border:'2.5px solid white'
                                           }}
                                           onClick={()=> setPlay(false)}> 
                                            X
                                           </Close>
                                           </Modal>
    
      </>
      // _____________________________________________
       : 

      <div style={{}}>
        <Border>
        <Title2 >{movie.title}</Title2>
        <SubTitleCont> <SubTitle>{movie.overview}</SubTitle></SubTitleCont>
    

        { trailer ? 
        <Button onClick={()=> setPlay(true) + window.scrollTo(0,100) }>
         <PlayCircleOutlineIcon style={{fontSize: '5em'}}/></Button>  

        : <Modal><Title>"No trailer found"</Title></Modal>}

        </Border>
      </div>
    }
            </Box> 
 
           : <Modal><Title>no movies found</Title></Modal>}
    
           </MovieContainer>
           
           : <Modal><Title>no movies found</Title></Modal>}

 
         </>
         <div style={{paddingBottom: '2%', display:'flex', margin:'2rem auto', overflow:'scroll', maxWidth: '280%', height:'50vh'}}>

  {renderMovies()}
 
  </div>


</Container> 
<Footer/>
</Container>

  )};
  
  
  


  



export default Home;