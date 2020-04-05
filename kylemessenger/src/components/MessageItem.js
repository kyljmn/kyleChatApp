import React from 'react';

const MessageItem = ({message}) => {
return (
    <div>
        <h4>{message.sender.username}</h4>
        <p>{message.body}</p>
    </div>
)
}

export default MessageItem;