import React, { useEffect, useState } from 'react';
import "./Chat.css";
import {IconButton, Input} from "@material-ui/core"
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
import FlipMove from 'react-flip-move';
import { v4 as uuidv4 } from 'uuid';
import Sentiment from 'sentiment';
// import Schedule1 from './Schedule';

const objectToQueryParam = obj => {
    const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
    return "?" + params.join("&");
  };
  

function Chat() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);

    var gapi = window.gapi;
    var CLIENT_ID = "28311222963-2h78gftbh4khmpvjpgkbp20vgj6sqfn6.apps.googleusercontent.com"
    var API_KEY = "AIzaSyAFfLpLvNeDMvccD-G52JnGP2fbbic8pWo"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"

    const sentiment = new Sentiment();

    useEffect(() => {
        if (chatId){
            db.collection('chats').doc(chatId).collection("messages")
            .orderBy('timestamp', 'asc').onSnapshot(snapshot => (
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
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName,
        });

        db.collection("chats").doc(chatId).collection("messages").get();

    
        console.log("input" + input);
            switch(true){
                case input.includes("Sentiment score:"):{
                    var sentence = input.split(':')[1];
                    var result = sentiment.analyze(sentence);
                    console.log("Sentiment score for " + sentence + ": ");
                    console.log(result);
                    var message = "";
                    var meme_img = "";

                    if(result.score <0){
                        message = "Aww, I am sorry you had a bad day and are not feeling great :("
                    }
                    else if(result.score===0){
                        message = "You seem to have had a neutral day."
                    }
                    else{
                        message = "I'm glad you had a great day!"
                    }

                    //Set caption for meme using user input
                    var sentence_array = sentence.split(" ");
                    var top_text = sentence_array.slice(0,sentence_array.length /2).join(" ");
                    var bottom_text = sentence_array.slice(sentence_array.length/2, sentence_array.length).join(" ");
                    //Fetch a meme
                    fetch("https://api.imgflip.com/get_memes").then(x => x.json().then(response => {
                            //console.log(response.data.memes);
                            const params = {
                                template_id: response.data.memes[0].id,
                                text0: top_text,
                                text1: bottom_text,
                                username: "jackeelam",
                                password: "kSV_G+aH4bEYyDe"
                              };
                              console.log(`https://api.imgflip.com/caption_image${objectToQueryParam(params)}`);
                            //   fetch(`https://api.imgflip.com/caption_image${objectToQueryParam(params)}`).then(img =>
                            //     img.json().then(img_json => {console.log("Generated meme url: "); console.log(img_json);} )
                            //   );
                              var random_index = Math.floor(Math.random() * response.data.memes.length); 
                              fetch('https://api.imgflip.com/caption_image', 
                                {
                                    method: 'POST',
                                    body: new URLSearchParams({
                                        template_id: response.data.memes[random_index].id,
                                        text0: top_text,
                                        text1: bottom_text,
                                        username: "jackeelam",
                                        password: "kSV_G+aH4bEYyDe"
                                    })
                                }
                              ).then(img =>
                                img.json().then(img_json => {
                                    console.log("Generated meme url: "); meme_img = img_json.data.url; console.log(meme_img);
                                    db.collection("chats").doc(chatId).collection("messages").add(
                                        {
                                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                            message: message,
                                            uid: uuidv4(),
                                            email: "abc@gmail.com",
                                            displayName: 'Sentiment Bot',
                                            meme_img: meme_img,
                                        }
                                    );
                                })
                              );
                        })
                    );

                    

                    break;
                }
                case input.includes("Events for"):{
                    var time_min = new Date();
                    time_min.setHours(0, 0, 0);
                    
                    var time_max = new Date();
                    time_max.setHours(23, 59, 59);
                    
                    //"03/25/2015"
                    if(input.includes("today") === false){
                        console.log(input.split(' ')[2]);
                        time_min = new Date(input.split(' ')[2]); //Event for 03/25/2015
                        time_min.setHours(0, 0, 0);
                        time_max = new Date(input.split(' ')[2]);
                        time_max.setHours(23, 59, 59);
                        
                    }
                    console.log(time_min);
                    console.log(time_max);

                    gapi.load('client:auth2', () => {
                        console.log('loaded client');
                  
                        gapi.client.init({
                          apiKey: API_KEY,
                          clientId: CLIENT_ID,
                          discoveryDocs: DISCOVERY_DOCS,
                          scope: SCOPES,
                        });

                        gapi.client.load('calendar', 'v3', () => console.log('bam!'))

                        gapi.auth2.getAuthInstance().signIn()
                        .then(() => {
                            //Get list of events
                            gapi.client.calendar.events.list({
                                'calendarId': 'primary',
                                'timeMin': time_min.toISOString(),
                                'timeMax': time_max.toISOString(),
                                'showDeleted': false,
                                'singleEvents': true,
                                'maxResults': 7,
                                'orderBy': 'startTime'
                              }).then(response => {
                                const events = response.result.items;
                                var messsage_to_add = {
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    message: 'Here are your scheduled events for ' + input.split(' ')[2] + ';',
                                    uid: uuidv4(),
                                    email: "abc@gmail.com",
                                    displayName: 'Scheduler Bot',
                                };
                                db.collection("chats").doc(chatId).collection("messages").add(
                                    messsage_to_add
                                );
                                for(let i = 0; i < events.length; i++){
                                    var start = new Date(events[i]['start']['dateTime']).toLocaleTimeString('en-US');
                                    var end = new Date(events[i]['end']['dateTime']).toLocaleTimeString('en-US');
                                    messsage_to_add["message"] = events[i]['summary'] + ' from ' + start + ' to ' + end;
                                    db.collection("chats").doc(chatId).collection("messages").add(
                                        messsage_to_add
                                    );
                                }
                                console.log('EVENTS: ', events)
                                console.log(events[0]['summary']);
                              })
                        });

                    });
                    break;

                }
                case input.includes("Schedule"):{
                    let split_str = input.split(',');
                    if(split_str.length !==5){
                        console.log('Cannot schedule, format must be in Schedule: description, Month dd, yyyy, hh:mm, hh:mm');
                        db.collection("chats").doc(chatId).collection("messages").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            message: 'Cannot schedule, format must be in Schedule: description, mm/dd/yy, hh:mm:ss, hh:mm:ss',
                            uid: uuidv4(),
                            email: "abc@gmail.com",
                            displayName: 'Scheduler Bot',
                        });
                    }
                    else{
                        //Description
                        let desc = split_str[0].split(':')[1].trimStart();
                        //Month and day
                        let event_date = split_str[1].trimStart();
                        //Year
                        let year = split_str[2].trimStart();
                        //Time start
                        let event_start_time = split_str[3].trimStart();
                        //Time end
                        let event_end_time = split_str[4].trimStart();

                        console.log(event_date + ', ' + year + ' ' + event_start_time);
                        console.log(event_date + ', ' + year + ' ' + event_end_time);

                        const eventStartTime = new Date(event_date + ', ' + year + ' ' + event_start_time);
                        const eventEndTime = new Date(event_date + ', ' + year + ' ' + event_end_time);
                        
                        gapi.load('client:auth2', () => {
                            console.log('loaded client');
                      
                            gapi.client.init({
                              apiKey: API_KEY,
                              clientId: CLIENT_ID,
                              discoveryDocs: DISCOVERY_DOCS,
                              scope: SCOPES,
                            });

                            gapi.client.load('calendar', 'v3', () => console.log('bam!'));
                            //Sign in user
                            gapi.auth2.getAuthInstance().signIn().then(() => {
                                const event = {
                                    summary: desc,
                                    location: 'N/A',
                                    description: 'Event description',
                                    start:{
                                        dateTime: eventStartTime,
                                        timeZone: 'America/Denver',
                                    },
                                    end:{
                                        dateTime: eventEndTime,
                                        timeZone: 'America/Denver',
                                    },
                                    colorId: 1, 
                                }
                                //Create event
                                var request = gapi.client.calendar.events.insert({
                                    'calendarId': 'primary',
                                    'resource': event,
                                  })
                                  let s = event_date + ', ' + year + ' ' + event_start_time;
                                  let e = event_date + ', ' + year + ' ' + event_end_time;
                                  request.execute(event => {
                                    console.log(event)
                                    window.open(event.htmlLink)
                                    db.collection("chats").doc(chatId).collection("messages").add({
                                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                        message: 'Added event to your Google Calendar! ' + 'Event: ' + desc + ' Time: ' + s + ' - '+ e + ' Link to event: ' +  event.htmlLink,
                                        uid: uuidv4(),
                                        email: "abc@gmail.com",
                                        displayName: 'Scheduler Bot',
                                        event_desc: desc,
                                        event_start: eventStartTime,
                                        event_end: eventEndTime,
                                        event_link: event.htmlLink,
                                    });

                                  })

                            });
                        });
                        
                    }
                    break;

                }; //end of case

                default:
                    //do nothing
            }

            
                
        //Firebase magic
        setInput("");
    };

    // Parsing input
    // switch(true){
    //     case input.includes("Time")
    // };
    
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
                <FlipMove> 
                {messages.map(({id, data}) => (
                    <Message key = {id} contents={data} />
                ))}
                </FlipMove>
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