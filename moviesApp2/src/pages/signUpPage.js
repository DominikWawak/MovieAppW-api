import React from 'react'
import SignUpForm from '../components/signUp'
import { Container } from 'react-bootstrap'
import {AuthContext} from '../contexts/AuthContext'


export default function signUpPage() {
    return (
        
            <div style={{backgroundColor:'#2E3B55'}}>
        <Container className = "d-flex align-items-center justify-content-center" 
        style={ {minHeight: "100vh"}}
        >
            <div className = "w-100" style ={{maxWidth:"400px"}}>
            <SignUpForm/>
            </div>
        </Container>
        </div>
       
    )
}
