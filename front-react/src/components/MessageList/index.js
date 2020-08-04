import React, {
  useEffect,
  useState
} from 'react';
import Compose from '../Compose';
import Message from '../Message';
import moment from 'moment';
import axios from 'axios';
import './MessageList.css';

const MY_USER_ID = 'user';

export default function MessageList(props) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages();
  }, [props.channelID]) //not channelID. from the parent, props.channelID.

  const getMessages = () => {
    console.log('start---');
    console.log(`http://localhost:4000/api/messages/${props.channelID}`);
    axios.get(`http://localhost:4000/api/messages/${props.channelID}`).then(response => {
      let newMessages = response.data.map(result => {
        return {
          id: `${result.id}`,
          channelID: `${result.channelID}`,
          user: `${result.user}`,
          message: `${result.text}`,
          timestamp: `${result.sentDate}`,
        };
      });
      setMessages([...newMessages])
    });
  }

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.user !== MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

  const reRenderPage = () => {
    getMessages();
    renderMessages();
  }

  return(
    <div className="message-list">
      <div className="message-list-container">{renderMessages()}</div>
      <Compose onRerenderPage={reRenderPage} activeChannelId={props.channelID}/>
    </div>
  );
}