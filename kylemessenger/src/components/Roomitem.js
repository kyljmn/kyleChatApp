import React from 'react';

const RoomItem = ({room, user, joinRoom, setCurrentRoom, currentRoom}) => {
    for (let member of room.members) {
        if (member.username !== user.username) {
            return (
                <div className="card">
                    <button className="stretched-link btn btn-link" onClick={(event) => {joinRoom(event, room, user);}}>{member.username}</button>
                </div>
            )
        }
    }
}

export default RoomItem;