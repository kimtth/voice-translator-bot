import React, { useState } from 'react';
import './Compose.css';
import send from '../../assets/sent_icon.png'
//import axios from 'axios';
import uuid from 'node-uuid';
import Button from '../Button/button';
import ToggleButton from '../Button/togglebutton';

export default function Compose(props) {

    const [inputValue, setInputValue] = useState([]);

    const handleSubmit = e => {
      if (e.target.id === "send"){
        if (!!inputValue){ //string empty check. not not
          e.preventDefault();
          return
        } else {
          const tempMessage = {
            id: `${Date.now()}${uuid.v4()}`,
            channelID: `${props.activeChannelId}`,
            text: inputValue,
            user: "user"
          }
          //instead f axios, use fetch. axios post stucks in cors issue.
          fetch('http://localhost:4000/api/message', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(tempMessage)
          });
          props.onRerenderPage();
          setInputValue('');
        }
      } else if (e.target.id === "mic") {
        console.log("mic");
      }
      e.preventDefault();
    };

    const handleChange = e => {
      setInputValue(e.target.value)
    }

    return (
      <form>
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message"
          value={inputValue} onChange={handleChange}
        />
        <Button img={send} type={"submit"} id={"send"} onClick={handleSubmit}/>
        <ToggleButton type={"submit"} id={"mic"} onClick={handleSubmit} />
      </div>
      </form>
    );
}