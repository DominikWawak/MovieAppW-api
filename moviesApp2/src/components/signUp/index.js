import { formatMs } from '@material-ui/core'
import React ,{useRef ,useState,useContext}from 'react'
import {Form,Button,Card, FormLabel, FormControl, Alert} from 'react-bootstrap'
import { Redirect } from "react-router-dom";
import { getUser } from '../../api/movie-api';

import { AuthContext} from '../../contexts/AuthContext'
//USE HISTORY ADDED
import { Link, useHistory} from 'react-router-dom'

export default function SignUpForm() {
    const context = useContext(AuthContext)
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationlRef = useRef()
    //const currentUser=useAuth()
    const [registered, setRegistered] = useState(false);
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const history = useHistory()



    async function handleSubmit(e){
        // Prevent form from refresing 

        if(passwordRef.current.value !== passwordConfirmationlRef.current.value){
            return setError('Password do not match')
        }
        e.preventDefault()

        try{
            setError("")
            setLoading(true)
            const r = context.register(emailRef.current.value, passwordRef.current.value);
            if(r){
            console.log(r)
            }
            const secret = await getUser(emailRef.current.value)
            
            setError("Please check your email to complete authentiation " + secret.authToken)
            setRegistered(true);
        //   }
        } catch{
            console.log(e)
            setError('Failed to create account ')
        
        }
        setLoading(false)
    }

    if (context.userName != "") {
        return <Redirect to="./Dashboard" />;
      }

    if (registered === true) {
        //return <Redirect to="./login" />;
      }
    



    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">SIGN UP</h2>
                {/* <h4>Currently logged in as {currentUser?.email}</h4> */}
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id ="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl type ="email" ref= {emailRef} required/>
                    </Form.Group>
                    <Form.Group id ="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl type ="password" ref= {passwordRef} required/>
                    </Form.Group>
                    <Form.Group id ="password-confirmation">
                        <FormLabel>Password Confirmation</FormLabel>
                        <FormControl type ="password" ref= {passwordConfirmationlRef} required/>
                    </Form.Group>
                    <br/>
                    <Button disabled= {loading} className="w-100" type ="submit">SignUP</Button>
                </Form>
                <div className="w-100 text-center mt-2">
            Already have account? <Link to="/logIn">Log In</Link>
        </div>
            </Card.Body>
        </Card>

       
            
        </>
    )
}
