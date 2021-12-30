import React from 'react'
import { useEffect,useState } from 'react';
import { AddCircle } from '@material-ui/icons';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemAvatar } from '@material-ui/core';

import { ListItemText } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import { Box } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import { Button } from 'react-bootstrap';
import FavoriteIcon from "@material-ui/icons/Favorite";
import { getFavourites, getWatchList ,getReviewOfUser,updateReview} from '../../api/movie-api';

export default function UserStats(props) {
    const [open, setOpen] = React.useState(false);
  const handleOpen = async () => {setOpen(true);}
  const handleClose = () => setOpen(false);
  const [toWatch,setToWatch] = useState([])
  const [fndFavs,setFndFavs] = useState([])
  const [fndReviews,setFndReviews] = useState([])
  const [likes,setLikes]=useState(0)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        overflow:'scroll',
        display:'block',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      
    const watchlist = async () =>{
        setToWatch(await getWatchList(props.fnd.username))

    }
    const fndFavourites = async () =>{
        setFndFavs(await getFavourites(props.fnd.username))

    }
    const fetchFndReviews= async () =>{
        setFndReviews(await getReviewOfUser(props.fnd.username))

    }
    useEffect(() => {
       watchlist()
       fndFavourites()
       fetchFndReviews()
    }, [])

    async function handleLike(id,likes){
        console.log(id,likes);
        const l = likes+1
        setLikes(l)
        await updateReview(id,l)
    }
    
      

    return (
        <div>
            <Button onClick={handleOpen}>o</Button>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.fnd.username + " is watching: "}
            <List dense={true}>
             {toWatch.map((watchlist)=>(
                 
                <ListItem>
                  <ListItemAvatar>
                    <Avatar 
                    alt="MoviePoster"
                    src={"https://image.tmdb.org/t/p/original/"+watchlist.poster_path}
                    variant="square">
                      
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={watchlist.title}
                    secondary={"Watch me"}
                  />
                   <IconButton onClick={() => alert("Hello from here")} aria-label="follow" >
                      <AddCircle style={{ color: 'red' }} />
                    </IconButton>
                </ListItem>
              ))}
            </List>
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.fnd.username + " likes: "}
            <List dense={true}>
             {fndFavs.map((watchlist)=>(
                 
                <ListItem>
                  <ListItemAvatar>
                    <Avatar 
                    alt="MoviePoster"
                    src={"https://image.tmdb.org/t/p/original/"+watchlist.poster_path}
                    variant="square">
                      
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={watchlist.title}
                    secondary={"Watch me"}
                  />
                   <IconButton onClick={() => alert("Hello from here")} aria-label="follow" >
                      <AddCircle style={{ color: 'red' }} />
                    </IconButton>
                </ListItem>
              ))}
            </List>
            </Typography>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.fnd.username + " Reviewed "}
            <List dense={true}>
             {fndReviews.map((review)=>(
                 
                <ListItem>
                  <ListItemAvatar>
                    <Avatar 
                   
                    variant="square">
                      
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={review.Author}
                    secondary={review.content + " Rating: "+review.rating}
                  />
                   <IconButton type="submit" aria-label="like" onClick={function(){handleLike(review._id,review.likes)}} >
                   <FavoriteIcon color='Red' /> {review.likes}
                    </IconButton>
                </ListItem>
              ))}
            </List>
            </Typography>
          
         


            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>
        </Box>
      </Modal>
       
        </div>
    )
}
