import { Avatar } from '@material-ui/core';
import React, {forwardRef} from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import "./Message.css";
import image from './lock.gif';

const Message = forwardRef(
    (
        {id, contents: {timestamp, displayName, email, message, photo, event_desc, event_start, event_end, event_link, meme_img, url1, url2, url3, label1, label2, label3, source1, source2, source3, img1, img2, img3} },
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
                <img src={meme_img} alt={meme_img} />
            </p>
           }

        {displayName === 'Username_Bot' && 
          <p id='txt__username'>
          <img className='lock_gif' src={image} alt='lock_animation_gif' width={200}/>
          </p>
        }

        {displayName === 'Password_Bot' &&  
          <p id='txt__password'>
          <img className='lock_gif' src={image} alt='lock_animation_gif' width={200}/>
          </p>
        }

        {displayName === 'Scheduler_Bot' &&  
          <p id='txt__scheduler'>
          {message}
          </p>
        }

        {displayName === 'Recipe_Bot' &&
          <p id='txt__recipe'>
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
        }

        </div>
    )
});

export default Message