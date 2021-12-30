import React,{useState,useEffect} from "react";
import { withRouter } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
//import useMovie from "../hooks/useMovie";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import axios from "axios";


const MovieDetailsPage = (props) => {
  const { id } = props.match.params
  const [video,setVideo] = useState("");
  console.log(id);
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  
  const getVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    );
    console.log(data);
    setVideo(data.results[0]?.key);
  };
  
  useEffect(() => {
   getVideo();
  }, [])

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const path=`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
  const videoPath= `https://www.youtube.com/embed/${video}`

  return (
    <>
      {movie ? (
        <>
       
        <div style={{backgroundImage: `url(${path})`}}>
          <PageTemplate movie={movie}>   
         
          <iframe src={videoPath}
        frameborder='0'
        allow='autoplay; encrypted-media'
        allowfullscreen
        title='video'
        width="1000px"
        height="750px"
/>

<iframe  src={"http://autoembed.xyz/movie/tmdb/"+movie.id}  width="1000px" height="750px" frameborder="0" allowfullscreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen" 
        msallowfullscreen="msallowfullscreen" 
        oallowfullscreen="oallowfullscreen" 
        webkitallowfullscreen="webkitallowfullscreen"></iframe>
          {/* <img src={path}/> */}
            <div style={{backgroundColor:"white", color:'#2E3B55', marginTop:'5%'}}>
            <MovieDetails movie={movie} />
            </div>

     
            
          </PageTemplate>
          </div>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default withRouter(MovieDetailsPage);