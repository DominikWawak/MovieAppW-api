import { formatMs } from '@material-ui/core'
import React ,{useRef ,useState}from 'react'
import {Form,Button,Card, FormLabel, FormControl, Alert} from 'react-bootstrap'
//import { useAuth } from '../../contexts/AuthContext'

import {Link, useHistory} from "react-router-dom";
import { forgotPassword } from '../../api/movie-api';
//import firebase from 'firebase/compat';
import { Redirect } from "react-router-dom";

export default function ForgotPassword() {

    const emailRef = useRef()
    //const {logIn} = useAuth()
    const [error,setError] = useState("")
    const [message,setMessage] = useState("")
    const [loading,setLoading] = useState(false)
    const [validEmail,setValidEmail]=useState(false)
    const [resetToken,setResetToken] = useState("")
    //const {resetPassword} = useAuth()

    const history = useHistory()


    async function handleSubmit(e){
        // Prevent form from refresing 

       
        e.preventDefault()

        try{
            setMessage("")
            setError("")
            setLoading(true)
        //await firebase.auth().sendPasswordResetEmail(emailRef.current.value)
        const token = await forgotPassword(emailRef.current.value)
        setResetToken(token)
        setMessage("check your inbox for further instructions")
       setValidEmail(true)
        } catch{
          setError('Failed to reset Password')
        
        }
        setLoading(false)
    }

if(validEmail){
    return <Redirect to={{
        pathname: "./forgotPasswordForm",
        state: { email:emailRef.current.value,token:resetToken}
      }} />;
}

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Password Reset</h2>
                
                {error && <Alert variant='danger'>{error}</Alert>}
                {message && <Alert variant='sucess'>{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id ="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl type ="email" ref= {emailRef} required/>
                    </Form.Group>
                 
                    
                    <br/>
                    <Button disabled= {loading} className="w-100" type ="submit">Reset Password</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/logIn">Log In</Link>
                </div>


            </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
            Dont have a have account? <Link to="/signUp">Sign Up</Link>
        </div>
            
        </>
    )
}
