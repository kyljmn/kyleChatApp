import React from 'react';
import MessageItem from './MessageItem.js';

const MessagesBox = ({currentRoom, messages, loggedin}) => {
    if (currentRoom && loggedin && messages.length !== 0) {
        let chat = messages.map((message) =>
            <MessageItem key={message._id} message={message} />
        );
        return (<div>
            <div>{currentRoom._id}</div>
            <div>{chat}</div>
        </div>)
    }
    else {
        return null;
    }

}

export default MessagesBox;