import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './css/App.css';
import Imessage from "./js/Imessage";
import { selectUser, login, logout } from "./features/userSlice";
import Login from './js/Login';
import { auth } from "./js/firebase"

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

