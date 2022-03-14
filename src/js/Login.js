import { Button } from '@material-ui/core';
import React from 'react';
import "../css/Login.css";
import {auth, provider} from "./firebase";
import image from '../icons/jots_icon.png';

function Login(){

    //Popup to sign in with gmail
    const signIn = () => {
        auth.signInWithPopup(provider).catch(error=> alert(error.message));
    }
    return (
        <div className="login">
            <div className="login_logo">
                <img src={image} alt="Jots icon" />
                <h1>Jots</h1>
            </div>
        
            <Button onClick={signIn} >
                Sign In
            </Button>
        </div>
    )
}

export default Login