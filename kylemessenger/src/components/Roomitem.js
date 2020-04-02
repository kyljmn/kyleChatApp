import React from 'react';

const RoomItem = ({room, user, joinRoom, setCurrentRoom, currentRoom}) => {
    for (let member of room.members) {
        if (member.username !== user.username) {
            return <li><button onClick={(event) => {joinRoom(event, room, user);}}>{member.username}</button></li>;
        }
    }
}

export default RoomItem;