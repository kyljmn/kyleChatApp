import React from 'react';
import MessageItem from './MessageItem.js';

const MessagesBox = (currentRoom, messages, loggedin) => {
    if (currentRoom && loggedin) {
        let chat = messages.map((message) =>
            <MessageItem key={message._id} message={message} />
        );
        return (<div>
            <div>{currentRoom}</div>
            <div>{chat}</div>
        </div>)
    }
    else {
        return null;
    }

}

export default MessagesBox;