import { formatMs } from '@material-ui/core'
import React ,{useRef ,useState}from 'react'
import {Form,Button,Card, FormLabel, FormControl, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
//USE HISTORY ADDED
import { Link, useHistory} from 'react-router-dom'
import firebase from 'firebase/compat'

export default function UpdateProfile() {

    const emailRef = useRef()
    
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const history = useHistory()



    async function handleSubmit(e){
        // Prevent form from refresing 

        // if(passwordRef.current.value !== passwordConfirmationlRef.current.value){
        //     return setError('Password do not match')
        // }
        //e.preventDefault()

        try{
            setError("")
            setLoading(true)
        // await signUp(emailRef.current.value,passwordRef.current.value)
          firebase.auth().currentUser.updateEmail(emailRef.current.value)
         history.push("/")
        } catch{
            setError('Failed to update Account ')
        
        }
        setLoading(false)
    }



    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id ="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl type ="email" ref= {emailRef} required defaultValue ={firebase.auth().currentUser.email}/>
                    </Form.Group>
                    {/* <Form.Group id ="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl type ="password" ref= {passwordRef} required/>
                    </Form.Group>
                    <Form.Group id ="password-confirmation">
                        <FormLabel>Password Confirmation</FormLabel>
                        <FormControl type ="password" ref= {passwordConfirmationlRef} required/>
                    </Form.Group> */}
                    <br/>
                    <Button disabled= {loading} className="w-100" type ="submit">Update</Button>
                </Form>
            </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
           <Link to="/logIn">Cancel</Link>
        </div>
            
        </>
    )
}
