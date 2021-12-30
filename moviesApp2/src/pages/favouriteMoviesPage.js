import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import { AuthContext } from "../contexts/AuthContext";

const FavoriteMoviesPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);
  const usrContext = useContext(AuthContext)
  const currentUser= usrContext.userName
  // Create an array of queries and run in parallel.
  
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  const movies = favoriteMovieQueries.map((q) => q.data);
  //const toDo = () => true;

  return (
    <div style={{backgroundColor:'#2E3B55'}}>
    <PageTemplate 
      title="Favorite Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
          { currentUser ?
            <WriteReview movie={movie} />
            : null
            }
          </>
        );
      }}
    />
    </div>
  );
};

export default FavoriteMoviesPage;