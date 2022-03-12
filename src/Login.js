import { Button } from '@material-ui/core';
import React from 'react';
import "./Login.css";
import {auth, provider} from "./firebase";

function Login(){

    //Popup to sign in with gmail
    const signIn = () => {
        auth.signInWithPopup(provider).catch(error=> alert(error.message));
    }
    return (
        <div className="login">
            <div className="login_logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/56/IMessage_logo_%28Apple_Inc.%29.png" alt="" />
                <h1>iMessage</h1>
            </div>
        
            <Button onClick={signIn} >
                Sign in
            </Button>
        </div>
    )
}

export default Login