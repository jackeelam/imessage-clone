import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Imessage from "./Imessage"; //could use ./Imessage.js as well, they are the same
import { selectUser, login, logout } from "./features/userSlice";
import Login from './Login';
import { auth } from "./firebase"

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
      auth.onAuthStateChanged(authUser => {
        if(authUser){
          //user is logged in
          dispatch(login ({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,

          }))
        }
        else{
          //user is logged out
          dispatch(logout());
        }
      })
    }, []
  );

  return (
    <div className="app">
      { user ? 
          <Imessage /> : //if there is a user, render app. else display login component
          <Login/>
      }
    </div>
  );
}


export default App;

