import React from 'react';
import MessageItem from './MessageItem.js';
import ScrollToBottom from 'react-scroll-to-bottom';

const MessagesBox = ({currentRoom, messages, loggedin, user}) => {
    if (currentRoom && loggedin && messages.length !== 0) {
        let chat = messages.map((message) =>
            <MessageItem key={message._id} message={message} user={user}/>
        );
        return (
            <ScrollToBottom className="container-fluid messages-box overflow-auto mb-0">
             {chat}
            </ScrollToBottom>
        );
    }
    else {
        return <div className="container-fluid messages-box overflow-auto mb-0"></div>;
    }

}

export default MessagesBox;