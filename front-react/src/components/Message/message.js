import React, { useRef, useEffect } from 'react';
import moment from 'moment';
import './Message.css';

export default function Message(props) {
    const messagesEndRef = useRef(null)
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp,
    } = props;

    useEffect(() => {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    });
  
    const friendlyTimestamp = moment(data.timestamp).format('LLLL');
    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
        }

        <div className="bubble-container">
          <div className="bubble" title={friendlyTimestamp}>
            { data.message }
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>
    );
}