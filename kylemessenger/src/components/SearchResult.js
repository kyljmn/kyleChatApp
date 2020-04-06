import React from 'react';

const SearchResult = ({addFriend, results}) => {
    if (Object.keys(results).length === 0) {
        return null;
    }
    else {
        return (
            <div className="input-group mb-1 mx-0 w-100">
                <button className="btn btn-success btn-block" onClick={(event) => addFriend(event)}>Add {results.username}</button>
            </div>
        );
    }
}

export default SearchResult;