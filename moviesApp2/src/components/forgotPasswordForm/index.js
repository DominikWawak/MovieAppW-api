import { formatMs } from '@material-ui/core'
import React ,{useRef ,useState,useContext}from 'react'
import {Form,Button,Card, FormLabel, FormControl, Alert} from 'react-bootstrap'
import { Redirect } from "react-router-dom";
import { getUser,verifyPasswordReset } from '../../api/movie-api';

import { AuthContext} from '../../contexts/AuthContext'
//USE HISTORY ADDED
import { Link, useHistory} from 'react-router-dom'

export default function PasswordForm(props) {
    const context = useContext(AuthContext)
    
    const passwordRef = useRef()
    const passwordConfirmationlRef = useRef()
    //const currentUser=useAuth()
    
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const history = useHistory()

    const email = props.location.state.email;
    const token= props.location.state.token;
    console.log(email)

    async function handleSubmit(e){
        // Prevent form from refresing 

        if(passwordRef.current.value !== passwordConfirmationlRef.current.value){
            return setError('Password do not match')
        }
        e.preventDefault()

        try{
            setError("")
            setLoading(true)
            const validEmail = await verifyPasswordReset(email,token)
            
           
        //   }
        } catch{
            console.log(e)
            setError('Failed to reset password ')
        
        }
        setLoading(false)
    }

    // if (context.userName != "") {
    //     return <Redirect to="./Dashboard" />;
    //   }

    // if (registered === true) {
    //     //return <Redirect to="./login" />;
    //   }
    



    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Reset Password</h2>
                {/* <h4>Currently logged in as {currentUser?.email}</h4> */}
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    
                    <Form.Group id ="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl type ="password" ref= {passwordRef} required/>
                    </Form.Group>
                    <Form.Group id ="password-confirmation">
                        <FormLabel>Password Confirmation</FormLabel>
                        <FormControl type ="password" ref= {passwordConfirmationlRef} required/>
                    </Form.Group>
                    <br/>
                    <Button disabled= {loading} className="w-100" type ="submit">Reset Password</Button>
                </Form>
                <div className="w-100 text-center mt-2">
            go back? <Link to="/logIn">Log In</Link>
        </div>
            </Card.Body>
        </Card>

       
            
        </>
    )
}
