import * as React from 'react';
import { useQuery } from 'react-query';
import { useEffect,useContext } from 'react';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { getUsers } from '../../api/movie-api';
import { Spinner } from 'react-bootstrap';
import { AddCircleOutlineOutlined } from '@material-ui/icons';
import { AddCircle } from '@material-ui/icons';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { ListItemAvatar } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { AuthContext } from '../../contexts/AuthContext';
import { addFriends ,getFriends} from '../../api/movie-api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [users,setUsers] = React.useState([])
  const context = useContext(AuthContext)

 const getUsersFn = async ()=>{
    const us = await getUsers();
    const currentUser = await context.userName
   const friends = await getFriends(currentUser)
   const noCurrentUser = us.filter((user) =>(
    user.username != context.userName
  ))

  const notFollowed = noCurrentUser.filter(u=>!noCurrentUser.includes(u))
    setUsers(notFollowed)
    console.log(notFollowed)
 }

 useEffect(() => {
  getUsersFn()
 }, [context.userName])

 async function handleAddFriend(friend){
   console.log("handle add Friend")
   await addFriends(context.userName,friend)

 }

  
  return (
    <div>
      <Button onClick={handleOpen}>Add friends</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Follow other Watchers
            <List dense={true}>
             {users.map((user)=>(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.username}
                    secondary={"Hey!, Wanna follow me?"}
                  />
                   <IconButton onClick={() => handleAddFriend(user._id)} aria-label="follow" >
                      <AddCircle style={{ color: 'red' }} />
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
  );
}