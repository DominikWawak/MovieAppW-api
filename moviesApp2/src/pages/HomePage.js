import React, { useEffect, useState ,createContext,useContext} from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies} from '../api/movie-api'
import {getTrendingMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavourites'
import PageNumContext from "../contexts/pageNumberContext.js"
import Paginator from "../components/Paginator";
import { Carousel, CarouselItem } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const HomePage = (props) => {
  
  //console.log("PLEASE WORK",props.pagenum)
  const [currentPage,setCurrentPage] = useState(1); 
  const [moviespp, setMoviespp] = React.useState(4);
  // try no chaching
 // const [movies, setMovies] = useState([]);
  const [trendingMovies,setTrendingMovies] = useState([]);

  useEffect(()=>{
    getTrendingMovies().then(trending => {
      setTrendingMovies(trending)
    })
    console.log(getMovies())
  },[moviespp])
  // useEffect(() => {
  //   getMovies(currentPage).then(movies => {
  //     setMovies(movies);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[currentPage]);

    
 
   
     const fetchProjects = (currentPage,moviespp ) => getMovies(currentPage,moviespp)
 
     const {
       isLoading,
       isError,
       error,
       data,
       isFetching,
       isPreviousData,
     } = useQuery(['projects', currentPage,moviespp], () => fetchProjects(currentPage,moviespp), { keepPreviousData : true })

     if (isLoading) {
      return <Spinner />
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    }  
  
  const movies = data.results;
  console.log("RES",data.results)
 
 
     
  const handlePageClicked = (data) =>{
    setCurrentPage(data.selected +1)
    console.log("clicked",data.selected)
    
    
  }
  const handleChangeMoviesPerPage = (event) => {
    setMoviespp(event.target.value);
  
  };

  console.log("outside",currentPage)
  
  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  //const addToFavorites = (movieId) => true 


  return (
    <>
    <div style={{backgroundColor:'#2E3B55'}}>
   <Carousel>

     {movies.map((movie)=>{
       return(
        <Carousel.Item>
        <img
          className="d-block w-100"
          src={"https://image.tmdb.org/t/p/original"+movie.backdrop_path}
          alt={movie.original_title}
        />
        <Carousel.Caption>
          <h3>{movie.original_title}</h3>
          
        </Carousel.Caption>
      </Carousel.Item>
       )
     })}
 
</Carousel>
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
    
      }}
      
     
    />
    <div  >
    <Paginator clickFunction = {handlePageClicked}/>
    </div>
    <div >
    <FormControl style={{minWidth: 180}}>
  <InputLabel id="demo-simple-select-label">Movies per page</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={moviespp}
    label="MoviesPP"
    onChange={handleChangeMoviesPerPage}
  >
    <MenuItem value={5}>5</MenuItem>
    <MenuItem value={10}>10</MenuItem>
    <MenuItem value={15}>15</MenuItem>
  </Select>
</FormControl>
</div>
    </div>
    </>
);
};

export default HomePage;

