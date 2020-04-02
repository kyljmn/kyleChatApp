import React from 'react';

const MessageInput = (messageinput, setMessageinput, sendMessage, currentRoom, loggedin) => {
    if (currentRoom && loggedin) {
        return (
            <div>
                <input type="text"
                    name="messageinput"
                    value={messageinput}
                    onChange={(event) => setMessageinput(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <button onClick={(event) => sendMessage(event)}>Send</button>
            </div>
        )
    } 
    else {
        return null;
    }
}

export default MessageInput;