import React, {useState} from 'react';
import './Compose.css';
import send from '../../assets/sent_icon.png'
import mic from '../../assets/mic_icon.png'
//import axios from 'axios';
import uuid from 'node-uuid';

export default function Compose(props) {

    const [inputValue, setInputValue] = useState([]);
    const handleSubmit = e => {
      if (inputValue === ""){
        e.preventDefault();
        return
      } else {
        const tempMessage = {
          id: `${Date.now()}${uuid.v4()}`,
          channelID: "1",
          text: inputValue,
          user: "user",
        }
        //instead f axios, use fetch. axios post stucks in cors issue.
        fetch('http://localhost:4000/api/message', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(tempMessage)
        });
      }

      props.onRerenderPage();
      setInputValue('');
      e.preventDefault();
    };

    const handleChange = e => {
      setInputValue(e.target.value)
    }

    return (
      <form onSubmit={handleSubmit}>
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message"
          value={inputValue} onChange={handleChange}
        />
        <button type="submit" className="button"><img src={send} alt="Send" width="30" height="25"/></button>
        <button type="submit" className="button"><img src={mic} alt="Mic" width="30" height="25"/></button>
      </div>
      </form>
    );
}