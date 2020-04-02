import React from 'react';

const Navbar = ( {setLoginName, setLoginPassword, loginName, loginPassword, login, user, error, logout, signup} ) => {
    if (!user) {
        return (
            <div>
            <form>
                <label>Username</label>
                <input type="text"
                    name="username"
                    placeholder="username"
                    value={loginName}
                    onChange={(event) => setLoginName(event.target.value)}
                />
                <label>Password</label>
                <input type="password"
                    name="password"
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
                />
                <button onClick={(event) => login(event)}>Log In</button>
                <button onClick={(event) => signup(event)}>Sign Up</button>
            </form>
            <p>{error}</p>
            </div>
        )
    } else {
        return (
            <div>
                <p>{user.username}</p>
                <button onClick={(event) => logout(event)}>Log Out!</button>
            </div>
        )
    }
}

export default Navbar;