import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch/conversationsearch';
import ConversationListItem from '../ConversationListItem/conversationlistitem';
import Toolbar from '../Toolbar/toolbar';
//import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import bot from '../../assets/bot.jpg';
import './ConversationList.css';


export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  const [filterConversations, setfilterConversations] = useState([]);
  useEffect(() => {
    getConversations()
  },[])

 const getConversations = () => {
    axios.get('http://localhost:4000/api/channels').then(response => {
        let newConversations = response.data.channels.map(result => {
          return {
            photo: bot,
            id: `${result.id}`,
            name: `${result.name}`,
            text: `${result.publishedDate}`,
          };
        });
        setConversations([...conversations, ...newConversations])
        setfilterConversations([...filterConversations, ...newConversations])
    });
  }

  const handleConversationChange = (searchKeyword) => {
    //console.log(searchKeyword);
    const filterConversations = conversations.filter(
      (conversation) => {
        return conversation.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1;
      }
    )
    setfilterConversations(filterConversations);
    if(searchKeyword === ""){
      setfilterConversations(conversations);
    }
  }

  const handleChannelChange = (e) => {
      let setValue = e.target.id; 
      props.setChannelID(setValue);
  }

  return (
    <div className="conversation-list">
      <Toolbar
        title="Translator Bot"
      />
      <ConversationSearch onConversationChange={handleConversationChange}/>
        {
          filterConversations.map(conversation =>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
              onHandle={handleChannelChange}
              activeChannel={props.channelID}
            />
          )
        }
    </div>
  );
}