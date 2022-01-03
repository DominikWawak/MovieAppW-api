import { formatMs } from '@material-ui/core'
import React ,{useRef ,useState,useContext}from 'react'
import {Form,Button,Card, FormLabel, FormControl, Alert} from 'react-bootstrap'
import { AuthContext} from '../../contexts/AuthContext'
import {Link, useHistory} from "react-router-dom";
import { Redirect } from "react-router-dom";

export default function LogInForm() {
    const context = useContext(AuthContext)
    const emailRef = useRef()
    const passwordRef = useRef()
    const TokenRef = useRef()
    // const {currentUser} = useAuth()
    // const {login} = useAuth()
    // const {isAuthenticated} = useAuth()
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)

    const history = useHistory()

    
    
    async function handleSubmit(e){
        // Prevent form from refresing 

       
        e.preventDefault()
        const r= await context.authenticateWT(emailRef.current.value,passwordRef.current.value,TokenRef.current.value)
        if(r){
             setError('Failed to sign In, check your email or password or you might be using the wrong code')
        }
        // try{
           
        // //     setError("")
        // //     setLoading(true)
        // //  await login(emailRef.current.value,passwordRef.current.value)
        // // history.push("/Dashboard")
        // } catch(e){
        //   setError('Failed to sign In')
        //   console.log(e)
        
        // }
        //setLoading(false)
    }

    const { from } =  { from: { pathname: "/" } };
    console.log("authenticated???",context.isAuthenticated)
  if (context.isAuthenticated === true) {
    return <Redirect to='./Dashboard' />;
  }



    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                
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
                    <Form.Group id ="password">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormControl type ="text" ref= {TokenRef} required/>
                    </Form.Group>
                    
                    <br/>
                    <Button disabled= {loading} className="w-100" type ="submit">LogIn</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/forgotPassword">Forgot Password?</Link>
                </div>
                <div className="w-100 text-center mt-2">
            Dont have a have account? <Link to="/signUp">Sign Up</Link>
        </div>

            </Card.Body>
        </Card>

       
            
        </>
    )
}
