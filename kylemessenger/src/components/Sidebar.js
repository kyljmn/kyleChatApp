import React from 'react';
import RoomList from './Roomlist';

const Sidebar = ({search, setSearch, searchFor, addFriend, results, rooms, user, loggedin, joinRoom, setCurrentRoom, currentRoom}) => {

    return (
        <div>
            <div>
                <input type="text"
                    name="searchFor"
                    placeholder="Search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? searchFor(event) : null}
                />
            </div>
            <div>
                <form>
                    <button onClick={(event) => addFriend(event)}>{results.username}, {results.id}</button>
                </form>
            </div>
            <RoomList rooms={rooms} user={user} loggedin={loggedin} joinRoom={joinRoom} setCurrentRoom={setCurrentRoom} currentRoom={currentRoom}/>
        </div>
        
    );
}

export default Sidebar;