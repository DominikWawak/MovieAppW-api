
import React,{useState,useContext,useEffect} from 'react'
import { Card,Button,Alert,Form } from 'react-bootstrap'
import { getReviews,updateReview,getFriends , getReviewOfUser} from '../api/movie-api'
import {AuthContext} from '../contexts/AuthContext'
import { AddCircle } from '@material-ui/icons';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemAvatar } from '@material-ui/core';

import { ListItemText } from '@material-ui/core';


import TextField from "@material-ui/core/TextField";
import { Paper } from '@material-ui/core'

import { Link, useHistory} from 'react-router-dom'
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { func } from 'prop-types'
import NestedModal from '../components/popUp';
import { Box } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import BasicModal from '../components/popUp';
import UserStats from '../components/userStatsPop';




export default  function Dashboard() {
  const [selectedFriend,setSelectedFriend] = React.useState({})
  
  
  const context = useContext(AuthContext)
  const [friends,setFriends]= useState([])
  const [likes,setLikes]=useState(0)
  const [friendSearchResults,setFriendSearchResults]= useState([])
  const [friendSearchString,setFriendSearchString] = useState("")

  
    const [error,setError]=useState("")

    const[reviews,setReviews]=useState([])

    // const {auth}=useContext(useAuth)
    // console.log(auth)
    
    const currentUser = context.userName
    console.log("USEr",currentUser)
    //const currentUser  = useAuth()
   // const {logOut} = useAuth()


    const history= useHistory()


    
       

        useEffect(() => {
            const getRevs = async() =>{
                // const data = await getDocs(reviewRef)
                // console.log(data)
                // // map to the data in the database but not the id 
                // setReviews(data.docs.map((doc) => ({...doc.data(),id: doc.id})).filter(function (review){
                //     return review.email===currentUser.currentUser.email;
                // }))
                
                // // data.docs.forEach((doc)=>{
                // //     setPosts([...posts,{...doc.data(),id: doc.id}])
                // // })

                const data = await getReviews();
                console.log("reviews",data)
                console.log("ReviewCurrentUser",currentUser)
                setReviews(data.filter(function (review){
                    return review.Author === currentUser
                })) 
            }
            const getFrnds = async() =>{
            
                const data = await getFriends(currentUser);
                console.log("Friends",data)
                setFriends(data) 
                setFriendSearchResults(data)
            }

            getRevs()
            getFrnds()
            
        }, [currentUser,likes])

        console.log("reviews2",reviews)
 

    function handleSubmit(){

    }

    async function handleLike(id,likes){
        console.log(id,likes);
        const l = likes+1
        setLikes(l)
        await updateReview(id,l)
    }
    

  


    async function handleLogOut(){

        setError('')

        try{
            //await firebase.auth().signOut()
            context.signout()
            history.push('/logIn')
        } catch{
            setError('Failed to log Out')
        }

    }

    const handleTextChange =(e)=>{
     
        setFriendSearchString(e.target.value)
   
        const ccc=friends.filter((f)=>{
          return f.username.toLowerCase().search(friendSearchString.toLowerCase()) !==-1;
        })
   
        setFriendSearchResults(ccc)
   
        console.log("ssss",ccc)
      }
    return (
        <>
        <Card>
            <Card.Body>
                <div>
                <h2 className="text=center mb-4">Profile</h2>
                
            <Button onClick={handleLogOut}>LogOut</Button>
            </div>
        
                {error && <Alert variant="danger"> {error}</Alert>}
                <strong>Email:</strong>  {currentUser}
                <div>
                <strong>Followers: </strong>{friends.length}    
                
                <BasicModal></BasicModal>
    
                </div>
                
                <Link to="/updateProfile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
            </Card.Body>

        </Card>


        <br></br>
    {/* <Form >
        <div class="form-group">
        <label for="exampleFormControlTextarea1">Create a post</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <Button className="w-100" type ="submit">Post</Button>
    </Form> */}
    

        <h2>Your Reviews</h2>
        <br/>
        <div>
            {reviews.map((review) =>{
                return (
                //     <div>
                //     {" "}
                //     <h1>{post.text}</h1>
                //     <h2>{post.createdAt}</h2>
                // </div>
                 <Card >
                 <CardHeader
                   avatar={
                     <Avatar aria-label="rating" >
                       {review.rating}
                     </Avatar>
                   }
                   action={
                     <IconButton type="submit" aria-label="like" onClick={function(){handleLike(review._id,review.likes)}}>
                       <FavoriteIcon color='Red' /> {review.likes}
                     </IconButton>
                   }
                   title={currentUser}
                   
                  subheader={review.content}
                 />
               </Card>
                )
            })}
        </div>
        <br></br>
        <h2>Your Friends</h2>
        <br/>
        <Paper>
<TextField
      
      id="filled-search"
      label="Search Watchers"
      type="search"
      value={friendSearchString}
      variant="filled"
      onChange={handleTextChange}
    />
{friendSearchResults.map((friend)=>{
  
  return(
    <div >
      
    <Card hoverable>
                 <CardHeader
                   avatar={
                 <Avatar  >
                       
                     </Avatar>
                   }
                  
                   title={friend.username}
                   
                   subheader={"Watching "+friend.watchlist.length +" Favourites "+friend.favourites.length}
                 />
                 <UserStats fnd={friend}/>
               </Card>
               

              
               </div>
  )
})}

</Paper>


{/* <UserStats
  open={open}
  handleClose={handleClose}
  user={selectedFriend}
  /> */}


        </>
    )
}
