import React from 'react';

const MessageInput = ({messageinput, setMessageinput, sendMessage, currentRoom, loggedin, user}) => {
    if (currentRoom && loggedin) {
        return (
            <div className="row input-group m-0">
                <input
                    className="form-control h-auto"
                    type="text"
                    name="messageinput"
                    value={messageinput}
                    onChange={(event) => setMessageinput(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" onClick={(event, user) => {console.log(user); sendMessage(event, user)}}>Send</button>
                </div>
            </div>
        )
    } 
    else {
        return null;
    }
}

export default MessageInput;