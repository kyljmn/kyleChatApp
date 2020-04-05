import React from 'react';

const SearchResult = ({addFriend, results}) => {
    if (Object.keys(results).length === 0) {
        return null;
    }
    else {
        return (
            <div>
                <p>{results.username}</p>
                <button onClick={(event) => addFriend(event)}>+</button>
            </div>
        )
    }
}

export default SearchResult;