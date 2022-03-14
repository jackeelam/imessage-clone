import { Avatar, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import "../css/Sidebar.css";
import SidebarChat from './SidebarChat';
import db, { auth } from "./firebase";

function Sidebar() {
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);

    useEffect(()=> {
        db.collection('chats').onSnapshot(snapshot=> (
            setChats(
                snapshot.docs.map(doc=> ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        ))
    },[]);

    const addChat = () => {
        const chatName = prompt('Please enter a chat name');
        if (chatName){
            db.collection('chats').add({
                chatName: chatName,
            });
        }
        
    };
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar className="sidebar_avatar" src={user.photo} onClick={()=> auth.signOut()}/>
                <div className="sidebar_input">
                    <SearchIcon/>
                    <input placeholder="Search" />
                </div>
                <IconButton variant="outlined" className="sidebar_inputButton">
                    <AddIcon onClick={addChat}/>
                </IconButton>  
                
            </div>
            
            <div className="sidebar_chats">

                {chats.map(( { id,data: {chatName} } )=>(
                    <SidebarChat key={id} id={id} chatName={chatName} />
                ))}

            </div>

        </div>
    ); 
}

export default Sidebar;