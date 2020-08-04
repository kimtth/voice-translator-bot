import React, {useEffect } from 'react';
import shave from 'shave';
import './ConversationListItem.css';

export default function ConversationListItem(props) {
    useEffect(() => {
      shave('.conversation-snippet', 20);
    })

    const { photo, id, name, text } = props.data;

    return (
      <div className={"conversation-list-item" + (props.activeChannel === id ? '-select' : '')}  onClick={props.onHandle} id={id}>
        <img className="conversation-photo" src={photo} alt="conversation" id={id}/>
        <div className="conversation-info" id={id}>
          <h1 className="conversation-title" id={id}>{ name }</h1>
          <p className="conversation-snippet" id={id}>{ text }</p>
        </div>
      </div>
    );
}