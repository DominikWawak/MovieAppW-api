import React, { useContext  } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import CalendarIcon from "@material-ui/icons/CalendarTodayTwoTone";
import StarRateIcon from "@material-ui/icons/StarRate";
import { AuthContext } from "../../contexts/AuthContext";
import Grid from "@material-ui/core/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

import "../css/movieCard.css"

const useStyles = makeStyles({
  card: { maxWidth: 345,},
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  movieover: {
    backgroundColor:"#2E3B55",
    position:"absolute",
   
    
    transform: 'translateY(100%)',
    transition: "transform 0.3s ease-in-out",

  }

 
  
});




export default function MovieCard({ movie, action }) {
 const context = useContext(AuthContext)
  const classes = useStyles();
  const { favorites,mustWatch} = useContext(MoviesContext);
  const currentUser = AuthContext.userName
  
  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  if (mustWatch.find((id) => id === movie.id)) {
    movie.mustWatch = true;
  } else {
    movie.mustWatch = false
  }

  // const handleAddToFavorite = (e) => {
  //   e.preventDefault();
  //   addToFavorites(movie);
  // };


  return (
  <>
  
    <Card className="moviecss">
       
    
      <CardMedia
        className={classes.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />


<div className="movieover">
<CardHeader
      className={classes.header}
      avatar={
        movie.favorite   ? (
          <Avatar className={classes.avatar}>
            <FavoriteIcon />
          </Avatar>
        ) :
        movie.mustWatch ? (
          <Avatar className={classes.avatar}>
            <PlaylistAdd />
          </Avatar>
        ) : null
      }
      title={
        <Typography variant="h5" component="p">
          {movie.title}{" "}
        </Typography>
      }
    />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      {action(movie)}

    <Link to={`/movies/${movie.id}`}>
    
        <Button variant="outlined" size="medium" color="primary">
          More Info + Play Movie
        </Button>
        
        </Link>
      </CardActions>
      </div>
    
      </Card>
      
    </>
  );
}