import React, {useState, useEffect} from 'react';
import axios from 'axios';
import io from 'socket.io-client';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MessagesBox from './components/MessagesBox';
import MessageInput from './components/MessageInput';

let socket;

const App = () => {
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const [currentRoom, setCurrentRoom] = useState();
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState('');
  const [loggedin, setLoggedin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageinput, setMessageinput] = useState('');
  const ENDPOINT='localhost:5000/';

  useEffect(() => {

    socket = io(ENDPOINT);

    return () => {
        socket.emit('disconnect');

        socket.off();
    }
  }, [ENDPOINT, user]);

  const searchFor = (event) => {
    event.preventDefault();
    if (search) {
        socket.emit('search', search);
    }
  }

  //Handle results of search
  useEffect(() => {
    socket.on('results', (results) => {
        setResults(results);
    })
  });
  //Get chat history upon joining room
  // useEffect(() => {
  //   socket.on('joined', (room) => {
  //     setCurrentRoom(room);
  //     setMessages(room.messages);
  //     console.log(room);
  //   })
  // }, [currentRoom])
  //Get room list
  useEffect(() => {
    socket.on('roomlist', (rooms) => {setRooms(rooms)});
  });

  useEffect(() => {
    socket.on('messagereceived', (newMessage)=> {
      setMessages([...messages, newMessage]);
    });
  });
  
  useEffect(() => {
    socket.on('joined', (roomx) => {
      setCurrentRoom(roomx);
      setMessages(roomx.messages);
    })
  })
  
  const addFriend = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/friends/add/' + results.id, user)
    .then((res) => {setResults(''); setSearch(''); socket.emit('login', user);})
    .catch((error) => {console.log(error)});
    setSearch('');
    setResults('');
  }

  const login = (event) => {
    event.preventDefault();
    let user = {
      username: loginName,
      password: loginPassword
    };
    axios.post('http://localhost:5000/login', (user))
      .then((res) => { setUser(res.data); setLoggedin(true); setLoginName(''); setLoginPassword(''); setError(''); socket.emit('login', user);})
      .catch((error) => {setError(error.message)});
  }

  const signup = (event) => {
    event.preventDefault();
    let user = {
      username: loginName,
      password: loginPassword
    };
    axios.post('http://localhost:5000/signup', user)
      .then((res) => { setUser(res.data); setLoggedin(true); setLoginName(''); setLoginPassword(''); setError(''); socket.emit('login', user);})
      .catch((error) => {setError(error.message)});
  }

  const logout = (event) => {
    event.preventDefault();
    axios.get('http://localhost:5000/logout')
      .then((res) => {setRooms([]); setLoggedin(false); setUser(); setLoginName(); setLoginPassword(); setError('');})
      .catch((error) => { setError(error.message)});
  }

  const joinRoom = (event, room) => {
    event.preventDefault();
    socket.emit('join', room);
  }

  const sendMessage = (event) => {
    event.preventDefault();
    let message = {
      sender: {
        id: user._id,
        user: user.username
      },
      body: messageinput,
      roomid: currentRoom._id
    };
    socket.emit('sendMessage', message , (message) => {
      setMessages([...messages, message]);
    });
  }

  return (
    <div>
      <Navbar setLoginName={setLoginName} 
        setLoginPassword={setLoginPassword} 
        loginName={loginName} 
        loginPassword={loginPassword}
        login={login}
        user={user}
        error={error}
        logout={logout}
        signup={signup}
      />
      <Sidebar
        search={search}
        setSearch={setSearch}
        searchFor={searchFor}
        addFriend={addFriend}
        results={results}
        rooms={rooms}
        user={user}
        loggedin={loggedin}
        joinRoom={joinRoom}
        setCurrentRoom={setCurrentRoom}
        currentRoom={currentRoom}
      />
      <MessagesBox 
        currentRoom={currentRoom}
        message={messages}
        loggedin={loggedin}
      />
      <MessageInput 
        messageinput={messageinput}
        setMessageinput={setMessageinput}
        sendMessage={sendMessage}
        currentRoom={currentRoom}
        loggedin={loggedin}
      />
    </div>


  );
  

};



export default App;