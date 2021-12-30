import React, { useEffect, useState ,createContext,useContext} from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getUpcomingMovies} from '../api/tmdb-api'
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'
import Paginator from "../components/Paginator";

const UpcomingMoviesPage = (props) => {
  // const {  data, error, isLoading, isError }  = useQuery('discover', getUpcomingMovies)

  // if (isLoading) {
  //   return <Spinner />
  // }

  // if (isError) {
  //   return <h1>{error.message}</h1>
  // }  

  const [currentPage,setCurrentPage] = useState(1); 

  // try no chaching
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getUpcomingMovies(currentPage).then(movies => {
      setMovies(movies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentPage]);
  
  const handlePageClicked = (data) =>{
    setCurrentPage(data.selected +1)
    console.log("clicked",data.selected)
    
    
  }

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  const mustWatch = movies.filter(m => m.mustWatch)
  localStorage.setItem('mustWatch', JSON.stringify(mustWatch))
  //const addToFavorites = (movieId) => true 

  return (
    <div style={{backgroundColor:'#2E3B55'}}>
    <Paginator clickFunction = {handlePageClicked} />
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
    />
    </div>
);
};

export default UpcomingMoviesPage;