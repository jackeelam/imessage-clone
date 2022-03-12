import React, { useEffect, useState } from 'react';
import "./Chat.css";
import {IconButton} from "@material-ui/core"
import MicNoneIcon from "@material-ui/icons/MicNone"
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from './features/chatSlice';
import db from './firebase';
// import firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { selectUser } from './features/userSlice';

function Chat() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);

    useEffect(() => {
        if (chatId){
            db.collection('chats').doc(chatId).collection("messages")
            .orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                })))
            ))
        }
    }, [chatId]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("chats").doc(chatId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
        });
        //Firebase magic
        setInput("");
    };
    return (
        <div className="chat">
            {/* chat header */}
            <div className="chat_header">
                <h4>
                To: <span className="chat_name"> {chatName}</span>
                </h4>
                <strong>Details</strong>
            </div>
            {/* chat messages */}
            <div className="chat_messages">
                {messages.map(({id, data}) => (
                    <Message key = {id} contents={data} />
                ))}
            </div>
            

            {/* chat input */}
            <div className="chat_input">
                <form >
                    <input value = {input} onChange={e => setInput(e.target.value)} placeholder="iMessage" type="text" />
                    <button onClick={sendMessage}> Send Message</button>
                </form>
                <IconButton>
                    <MicNoneIcon className="chat_mic"></MicNoneIcon>
                </IconButton>
                
            </div>
        </div>
    );
}

export default Chat;