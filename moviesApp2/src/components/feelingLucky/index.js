import React,{useState} from 'react'
import { useQuery } from 'react-query'
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardActionArea } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    card: {display: "flex" ,overflow:'none',width:700},
    media: { },
    avatar: {
      
    },
    movieover: {
      
      position:"absolute",
     
      
      transform: 'translateY(100%)',
      transition: "transform 0.3s ease-in-out",
  
    }
  
   
    
  });
export default function FeelingLuckyCard({show}) {
    const classes = useStyles();
    const [showNum, setShowNum] = useState(0)

    //var show= show[showNum]

    //console.log(shows)
    
    show=show
    


   

   
    return (
     
            
  
           <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          width="400"
          image={"https://image.tmdb.org/t/p/original"+show.backdrop_path}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {show.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {show.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
           
       
    )
}
