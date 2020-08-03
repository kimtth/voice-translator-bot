import React from 'react';
import './ConversationSearch.css';

export default function ConversationSearch(props) {

  //Lifts up the state. Remove the state component, then call the function of ancestor by props.
    const handleChange = e => {
      props.onConversationChange(e.target.value);
    };

    return (
      <div className="conversation-search">
        <input
          type="search"
          className="conversation-search-input"
          placeholder="Search Channel"
          onChange={handleChange}
        />
      </div>
    );
}