import React from 'react';

const MessageItem = ({message, user}) => {
    if(message.sender.username === user.username) {
        return (
            <div className="row justify-content-end mb-1 mx-1 mw-50">
                <div className="card float-right text-white bg-primary">
                     <div className="card-header p-1 text-right">{message.sender.username}</div>
                     <div className="card-body p-1">{message.body}</div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="row mb-1 mx-1 mw-50">
                <div className="card float-left">
                 <div className="card-header p-1">{message.sender.username}</div>
                    <div className="card-body p-1">{message.body}</div>
                </div>
            </div>
        )
    }
    
}

export default MessageItem;