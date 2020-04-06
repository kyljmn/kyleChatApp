import React from 'react';


const Navbar = ( {setLoginName, setLoginPassword, loginName, loginPassword, login, user, error, logout, signup} ) => {
    if (!user) {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <form className="form-inline my-2 my-lg-0">
                <input
                    className="form-control mr-sm-2" 
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={loginName}
                    onChange={(event) => setLoginName(event.target.value)}
                />
                <input 
                    className ="form-control mr-sm-2"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
                />
                <button className="btn btn-primary mx-1 my-sm-0" onClick={(event) => login(event)}>Log In</button>
                <button className="btn btn-info mx-1 my-sm-0" onClick={(event) => signup(event)}>Register</button>
            </form>
            <p>{error}</p>
            </nav>
        )
    } else {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">{user.username}</div>
                <button className="btn btn-primary mx-2 my-sm-0" onClick={(event) => logout(event)}>Log Out!</button>
            </nav>
        )
    }
}

export default Navbar;