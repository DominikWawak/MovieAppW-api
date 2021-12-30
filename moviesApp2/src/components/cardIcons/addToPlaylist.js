import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const AddToPlaylist = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddWatchlist = (e) => {
    e.preventDefault();
    context.addWatchlist(movie);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={handleAddWatchlist}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylist;