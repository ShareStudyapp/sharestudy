import React from 'react';
import ConversationList from '../components/Messenger/ConversationList';
import MessageList from '../components/Messenger/MessageList';
import './Messenger.css';

function Messenger() {
    return (
        <div className="messenger">
             <div className="scrollable sidebar">
                <ConversationList />
            </div>
            <div className="scrollable content">
                <MessageList />
            </div>
        </div>
    )
}

export default Messenger
