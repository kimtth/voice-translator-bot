import React, { useState } from 'react';
import ConversationList from '../ConversationList/conversationlist';
import MessageList from '../MessageList/messagelist';
import './Messenger.css';

export default function Messenger(props) {
    const [channelID, setChannelID] = useState("1")

    const SetActiveChannelID = (value) => {
        setChannelID(value);
    }

    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList setChannelID={SetActiveChannelID} channelID={channelID}/>
        </div>

        <div className="scrollable content">
          <MessageList channelID={channelID}/>
        </div>
      </div>
    );
}