import React from 'react';
import RoomItem from './Roomitem';
    
const RoomList = ({rooms, user, loggedin, joinRoom, setCurrentRoom, currentRoom}) => {
    if (rooms.length === 0) {
        return null;
    }
    else {
        const list = rooms.map((room) =>
            <RoomItem key={room._id} room={room} user={user} joinRoom={joinRoom} setCurrentRoom={setCurrentRoom} currentRoom={currentRoom}/>
        );
        return (
            <div>
                {list}
            </div>
        );
    }
}


export default RoomList;