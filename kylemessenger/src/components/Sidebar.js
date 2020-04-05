import React from 'react';
import RoomList from './Roomlist';
import SearchResult from './SearchResult';

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
            <SearchResult addFriend={addFriend} results={results} />
            <RoomList rooms={rooms} user={user} loggedin={loggedin} joinRoom={joinRoom} setCurrentRoom={setCurrentRoom} currentRoom={currentRoom}/>
        </div>
        
    );
}

export default Sidebar;