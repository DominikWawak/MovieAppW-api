import React,{useState} from 'react'
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import { getTrendingShows } from '../api/tmdb-api'
import FeelingLuckyCard from '../components/feelingLucky'
import { Carousel, CarouselItem } from "react-bootstrap";
import transitions from '@material-ui/core/styles/transitions'
import IconButton from "@material-ui/core/IconButton";

import Button from "@material-ui/core/Button";

export default function Feeling() {

    const {  data, error, isLoading, isError }  = useQuery('trendingShows', getTrendingShows )

    if (isLoading) {
        return <Spinner />
      }
    
      if (isError) {
        return <h1>{error.message}</h1>
      }  
      const shows = data.results;

    
      console.log(shows)

  function movieClick(){
    console.log("MOVIE CICKE YAYAYAYAYAYA")
  }
    return (
       

 <div >
   
<div style={{justifyContent: 'center',width:'100%',display:'flex'}}>
        <h1 style={{ justifyContent:"center"}}>What will you watch today?</h1>
        </div>
        {/* <div style={{justifyContent: 'center',width:'100%',display:'flex'}}>
       <Button size="large" color="secondary" variant="raised" onClick={movieClick}>Movie</Button>
       <Button size="large" color="primary">Show</Button>
       </div> */}
        

<div  style={{
        
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        paddingTop:'20em',
        
    }}>
<Carousel

          showarrows='False'
          infiniteloop='True'
          interval='0.00000000001'
          stoponhover='True'
          fade = 'True'
          slide='False'
          wrap='True'
          >

{shows.map((show)=>{
  return(
    
   <Carousel.Item >
     <br/>
      <FeelingLuckyCard show={show}/>
   
 </Carousel.Item>
  )
})}

</Carousel>
</div>
</div>
           
            
        
    )
}
