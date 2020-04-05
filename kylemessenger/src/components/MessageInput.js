import React from 'react';

const MessageInput = ({messageinput, setMessageinput, sendMessage, currentRoom, loggedin, user}) => {
    if (currentRoom && loggedin) {
        return (
            <div>
                <input type="text"
                    name="messageinput"
                    value={messageinput}
                    onChange={(event) => setMessageinput(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <button onClick={(event, user) => {console.log(user); sendMessage(event, user)}}>Send</button>
            </div>
        )
    } 
    else {
        return null;
    }
}

export default MessageInput;