import { Avatar } from '@material-ui/core';
import React, {forwardRef} from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import "../css/Message.css";
import image from '../icons/lock.gif';

const Message = forwardRef(
    (
        {contents: {timestamp, displayName, email, message, photo, event_desc, event_start, event_end, event_link, meme_img, url1, url2, url3, label1, label2, label3, source1, source2, source3, img1, img2, img3} },
    ref
    ) => {

    const user = useSelector(selectUser);
    return (
        <div ref={ref} className={`message ${user.email === email && "message_sender"}`}>
           {/* <Avatar className="message_photo" src={photo}/>
           <p>{message}</p>
           <small>{new Date(timestamp?.toDate()).toLocaleString()}</small> */}

            {displayName !== 'Sentiment_Bot' && displayName!=='Username_Bot' && displayName!== 'Password_Bot' && displayName!=='Scheduler_Bot' && displayName!=='Recipe_Bot' &&
              <>
              <Avatar className="message_photo" src={photo}/>
              <p>{message}</p>
              <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
              </>
            }
           {displayName === 'Sentiment_Bot' &&
           <>
              <Avatar className="message_photo" src={photo}/>
              <p>
                  {message} <br/>
                  <img src={meme_img} alt={meme_img} />
              </p>
              <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </>
           }


          {displayName === 'Username_Bot' && 
            <>
              <Avatar className="message_photo" src={photo}/>
              <p id='txt__username'>
                {message} <br />
                <img className='lock_gif' src={image} alt='lock_animation_gif' width={200}/>
              </p>
              <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </>
          }

          {displayName === 'Password_Bot' &&  
            <>
              <Avatar className="message_photo" src={photo}/>
              <p id='txt__password'>
                {message} <br />
                <img className='lock_gif' src={image} alt='lock_animation_gif' width={200}/>
              </p>
              <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </>
          }

          {displayName === 'Scheduler_Bot' &&  
            <>
              <Avatar className="message_photo" src={photo}/>
              <p id='txt__scheduler'>
                {message} <br />
                Link to event:
                <a href={event_link}>{event_link}</a>
              </p>
              <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>

            </>
            
            
          }

          {displayName === 'Recipe_Bot' &&
           <> 
              <Avatar className="message_photo" src={photo}/>
              <p id='txt__recipe'>
              {message} <br />
              {label1} from {source1} <br/><br/>
              <img className='recipe_img' src={img1} alt='Recipe_1_img'/><br/>
              <a href={url1}>{url1}</a><br/>
              <br/> {label2} from {source2}<br/><br/>
              <img className='recipe_img' src={img2} alt='Recipe_2_img'/><br/>
              <a href={url2}>{url2}</a><br/>
              <br/> {label3} from {source3}<br/><br/>
              <img className='recipe_img' src={img3} alt='Recipe_3_img'/><br/>
              <a href={url3}>{url3}</a><br/>
              </p>
              <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </>
          }

        </div>
    )
});

export default Message