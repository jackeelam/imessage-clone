import { Avatar } from '@material-ui/core';
import React, {forwardRef} from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import "./Message.css";

// function Message({id, contents: {timestamp, displayName, email, message, photo, uid}}){

//     const user = useSelector(selectUser);
//     return (
//         <div className={`message ${user.email === email && "message_sender"}`}>
//            <Avatar className="message_photo" src={photo}/>
//            <p>{message}</p>
//            <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
//         </div>
//     )
// }

// export default Message

const Message = forwardRef(
    (
        {id, contents: {timestamp, displayName, email, message, photo, uid, event_desc, event_start, event_end, event_link, meme_img} },
    ref
    ) => {

    const user = useSelector(selectUser);
    return (
        <div ref={ref} className={`message ${user.email === email && "message_sender"}`}>
           <Avatar className="message_photo" src={photo}/>
           <p>{message}</p>
           <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>

           {displayName === 'Sentiment Bot' &&
            <p>
                
                <img src={meme_img} alt={meme_img}/>
            </p>
           }
        </div>
    )
    
    // if (displayName==='Scheduler Bot'){
    //     return (
    //         <div ref={ref} className={`message ${user.email === email && "message_sender"}`}> 
    //             <Avatar className="message_photo" src={photo}/>
    //             <p>
    //                 {message} <br/>
    //                 Event: {event_desc} <br></br>
    //                 Time: {event_start}-{event_end} <br></br>
    //                 Link to event: {event_link}
    //             </p>
    //             <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
    //         </div> 
    //     )
    // }
    // else{
    //     return(
    //         <div ref={ref} className={`message ${user.email === email && "message_sender"}`}> 
    //         <Avatar className="message_photo" src={photo}/>
    //         <p>{message}</p>
    //         <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
    //         </div>   
    //     )
        
    // }
    // return (
    //     <div>

    //         {displayName==='Scheduler Bot' &&

    //             <div ref={ref} className={`message ${user.email === email && "message_sender"}`}> 
    //                 <Avatar className="message_photo" src={photo}/>
    //                 <p>
    //                     {message} <br/>
    //                     Event: {event_desc} <br></br>
    //                     Time: {event_start}-{event_end} <br></br>
    //                     Link to event: {event_link}
    //                 </p>
    //                 <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
    //             </div> 

    //         }

    //         {displayName === user.displayName && 
    //             <div ref={ref} className={`message ${user.email === email && "message_sender"}`}> 
    //                 <Avatar className="message_photo" src={photo}/>
    //                 <p>{message}</p>
    //                 <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
    //             </div>   
                
    //         }
    //        {/* <Avatar className="message_photo" src={photo}/>
    //        <p>{message}</p>
    //        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small> */}
    //     </div>
    // )
});

export default Message