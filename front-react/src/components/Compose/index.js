import React, { useState } from 'react';
import './Compose.css';
import send from '../../assets/sent_icon.png'
//import axios from 'axios';
import uuid from 'node-uuid';
import Button from '../Button/Button';
import ToggleMicButton from '../Button/ToggleMicButton';
import * as Config from '../App/Constants'

export default function Compose(props) {

    const [inputValue, setInputValue] = useState("");

    const handleSendSubmit = e => {
      if (inputValue === ""){ //string empty check.
        e.preventDefault();
        return
      } else {
        handleMessage();
        handleBotMessage();
      }
      e.preventDefault();
    };

    const handleMicSubmit = (msg) => {
      if(msg){
        console.log("call: " + msg);
        setInputValue(msg);
      }
      
      //handleMessage();
      //handleBotMessage();
      //e.preventDefault();
    }

    const handleMessage = () => {
      const tempMessage = {
        id: `${Date.now()}${uuid.v4()}`,
        channelID: `${props.activeChannelId}`,
        text: inputValue,
        user: "user"
      }
      //instead of axios, use fetch. axios post stucks in cors issue.
      fetch(`${Config.API_URL}/api/message`, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(tempMessage)
      })
      .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        console.log("DATA STORED");
      })
      .catch((error) => {
        console.log('error: ' + error);
        this.setState({ requestFailed: true });
      });

      props.onRerenderPage();
      setInputValue('');
    }

    const handleBotMessage = () => {
      const tempMessage = {
        id: `${Date.now()}${uuid.v4()}`,
        channelID: `${props.activeChannelId}`,
        user: "bot"
      }
      fetch(`${Config.API_URL}/api/bot/message`, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(tempMessage)
      })
      .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        console.log("DATA STORED");
      })
      .catch((error) => {
        console.log('error: ' + error);
        this.setState({ requestFailed: true });
      });

      props.onRerenderPage();
      setInputValue('');
    }

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
        <Button img={send} type={"submit"} id={"send"} onHandle={handleSendSubmit}/>
        <ToggleMicButton type={"submit"} id={"mic"} onHandle={handleMicSubmit} />
      </div>
      </form>
    );
}