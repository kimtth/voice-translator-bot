import React from 'react';
import './Compose.css';
import send from '../../assets/sent_icon.png'
import mic from '../../assets/mic_icon.png'

export default function Compose(props) {

    const handleSendClick = e => {
      const text = e.target.value;
      console.log(text);
    };

    const handleMicClick  = e => {
      
    };

    return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
        />
        <button className="button" onClick={handleSendClick}><img src={send} width="30" height="25"/></button>
        <button className="button" onClick={handleMicClick}><img src={mic} width="30" height="25"/></button>
      </div>
    );
}