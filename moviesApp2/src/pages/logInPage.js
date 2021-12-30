import React from 'react'

import { Container } from 'react-bootstrap'
import {AuthProvider} from '../contexts/AuthContext'
import LogInForm from '../components/logIn'

export default function logInPage() {
    return (
       
        
        
        <div style={{backgroundColor:'#2E3B55'}}>
        <Container className = "d-flex align-items-center justify-content-center" 
        style={ {minHeight: "100vh"}}
        >
            <div className = "w-100" style ={{maxWidth:"400px"}}>
            <LogInForm/>
            </div>
        </Container>
        </div>
       
    )
}
