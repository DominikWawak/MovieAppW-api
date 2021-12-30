
import React, { useState,useEffect} from "react";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MonetizationIcon from "@material-ui/icons/MonetizationOn";
import StarRate from "@material-ui/icons/StarRate";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MovieReviews from "../movieReviews"
import { useQuery } from 'react-query'
import Spinner from '../spinner'
import { getMovieCredits } from "../../api/tmdb-api";
import axios from "axios";
import { Card,Button,Alert,Form } from 'react-bootstrap'
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));


  const MovieDetails = ({ movie }) => {  
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [credits,setCredits]= useState([])
  const [creditsSearch,setCreditsSearch]= useState([])
  const [actorSearch,setActorSearch] = useState("")
  // const {  data, error, isLoading, isError }  = useQuery('discover', getMovieCredits(movie.id))

  // if (isLoading) {
  //   return <Spinner />
  // }

  // if (isError) {
  //   return <h1>{error.message}</h1>
  // }  
  // const credits = data.results;

  // console.log("CREDITS",credits)


  const fetchCredits = async () => {
    
    const {data}= await axios.get( `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`)
    setCredits(data.cast)
    setCreditsSearch(data.cast)
  }

  useEffect(() => {
    fetchCredits()
  }, [])
   console.log("CREDITS",credits)

  
   const handleTextChange =(e)=>{
     
     setActorSearch(e.target.value)

     const ccc=credits.filter((c)=>{
       return c.original_name.toLowerCase().search(actorSearch.toLowerCase()) !==-1;
     })

     setCreditsSearch(ccc)

     console.log("ssss",ccc)
   }

  return (
    <>
    
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" className={classes.root}>
        <li>
          <Chip label="Genres" className={classes.chip} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} className={classes.chip} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" className={classes.root}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
        
    
      </Paper>
      <Paper component="ul" className={classes.root}>
          <chip label="Production Countries" />
          {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={`Production Countries: ${g.name}  `} />
          </li>
        ))}
      </Paper>


    
<Paper>
<TextField
      
      id="filled-search"
      label="Search Actors"
      type="search"
      value={actorSearch}
      variant="filled"
      onChange={handleTextChange}
    />
{creditsSearch.map((credit)=>{
  return(
    <Card >
                 <CardHeader
                   avatar={
                     <Avatar alt={credit.name} src={"https://image.tmdb.org/t/p/w500"+credit.profile_path}  >
                       
                     </Avatar>
                   }
                  
                   title={credit.original_name}
                   
                   subheader={credit.character}
                 />
               </Card>
  )
})}

</Paper>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        className={classes.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

      
    </>
  );
};

export default  MovieDetails ;