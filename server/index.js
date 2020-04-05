const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('./passport/index');
const authRoutes = require('./routes/authRoutes');
const friendsRoutes = require('./routes/friendsRoutes');
const cors = require('cors');
const User = require('./models/user');
const Room = require('./models/room');
const Message = require('./models/message');

app.use(cors());
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: ['cookie', 'muffin']
}));

require('dotenv').config();
const port = 5000;
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    console.log('MongoDB successfully connected');
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);
app.use('/friends', friendsRoutes);

io.on('connection', (socket) => {
  socket.on('login', (user) => {
    Room.find({"members.username": user.username}).exec((error, rooms) => {
      if (error) {
        socket.emit("error", error);
      }
      else {
        socket.emit("roomlist", rooms);
      }         
    })
  });

  socket.on('join', (room, cb) => {
    socket.join(room._id);
    Room.findById(room._id).exec((error, roomx) => {
      if (error) {
        socket.emit("error", error);
      }
      else {
        socket.emit('joined', roomx);
      }
    })
  });

  socket.on('search', (username) => {
    User.find({ username: username}).exec((error,user) => {
      if (error) {
        socket.emit("error", error);
      }
      else if (!user[0]) {
        socket.emit("error", {message: "User doesn't exist"});
      } 
      else {
        let results = {username: user[0].username, id: user[0]._id}
        socket.emit("results", results);
      }
    });
  });
  
  socket.on('sendMessage', (message) => {
    Room.findById(message.roomid).exec((error, room) => {
      if (error) {
        socket.emit("error", error);
      }
      let newMessage = new Message({
        sender: {
          id: message.sender.id,
          username: message.sender.username
        },
        body: message.body
      });
      newMessage.save();
      room.messages.push(newMessage);
      room.save();
      io.in(message.roomid).emit('messagereceived', newMessage);
    });
  });
});


server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

