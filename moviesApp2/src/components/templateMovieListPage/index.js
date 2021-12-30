import React, { useState,useEffect } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieList from "../movieList";
import Paginator from "../Paginator";
import HomePage from "../../pages/HomePage";
import { getMovieCredits } from "../../api/tmdb-api";
import { getMovieReviews } from "../../api/tmdb-api";
import { useQuery } from 'react-query'
import Spinner from '../spinner'
import { VolumeDownSharp } from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});



function MovieListPageTemplate({ movies, title, action , paginator}) {
  const classes = useStyles();
  const [nameFilter, setNameFilter] = useState("");
  const [actorFilter, setActorFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortPopularity,setSortPopularity]=useState(false);
  const genreId = Number(genreFilter);
 
 
 // const [currentPage,setCurrentPage] = useState(1); 
  

  // const handlePageClicked = (data) =>{
  //   setCurrentPage(data.selected)
  //   console.log("clicked",data.selected)
    
    
  // }


//   useEffect(()=>{
//     movies.map( (mov) =>{
//       fetchCredits(mov.id)
// });
//   },[])
  
  

  

  //console.log("CRED",credits)
  


   
  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

    

  const handleChange = (type, value) => {
  
    if (type === "name") setNameFilter(value);
    else if (type == "pop"){ 
      setSortPopularity(value)
      if(!value){
        movies.sort((a,b)=> {
          return a.popularity-(b.popularity)
      })
      }
      else{
        movies.sort((a,b)=> {
          return b.popularity-(a.popularity)
      })
      }
    
    }
   
    else setGenreFilter(value);
  };


  return (
    <>
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
       
        <Grid key="find" item xs={12} >
          <FilterCard
            style={{backgroundColor:"252f44"}}
            onUserInput={handleChange}
            titleFilter={nameFilter}
           
            genreFilter={genreFilter}
            sortPopularity={sortPopularity}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>

    <div>
      {paginator}
    </div>
    
    </>
    
  );
  //<Paginator clickFunction = {handlePageClicked}/>
}
export default MovieListPageTemplate;