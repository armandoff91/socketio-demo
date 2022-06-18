const axios = require('axios');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var unsentMessages = {}
app.get('/', (req, res) => {
  res.send("Hello world")
});

io.use((socket, next) => {
  console.log(socket.handshake.auth.userId)
  socket.user = socket.handshake.auth.userId
  
  next()
})
io.on('connection', (socket) => {
  console.log('a user connected: '+ socket.user);
  socket.join(socket.user)
  console.log("finding unsent message: " + socket.user)
  if (unsentMessages[socket.user]) {
    for (i in unsentMessages[socket.user]) {
      socket.emit("msg", unsentMessages[socket.user][i])
    }
    delete unsentMessages[socket.user]
  }
  if (!unsentMessages[socket.user]) {
    console.log("no unsent messages")
  }

  socket.on("msg", (obj, callback) => {
    console.log("msg emitted", obj)
    if (io.of("/").adapter.rooms.get(obj.receipient)) {
      console.log(io.of("/").adapter.rooms.get(obj.receipient).size)
      socket.to(obj.receipient).emit("msg", obj.msg)
    } else {
      if (!unsentMessages[obj.receipient]) {
        unsentMessages[obj.receipient] = []
      }
      unsentMessages[obj.receipient].push(obj)
      console.log("unsent message saved")
    }
    callback("OK")
  })

  socket.on("received", (obj, callback) => {
    console.log("received emitted", obj)
    if (io.of("/").adapter.rooms.get(obj.receipient)) {
      console.log(io.of("/").adapter.rooms.get(obj.receipient).size)
      socket.to(obj.receipient).emit("received", obj)
    } else {
      if (!unsentMessages[obj.receipient]) {
        unsentMessages[obj.receipient] = []
      }
      unsentMessages[obj.receipient].push(obj)
      console.log("unsent message saved")
    }
    callback("OK")
  })
});
io.on("foo", (socket) => {
    console.log("foo 2")
})
server.listen(3000, () => {
  console.log('listening on *:3000');
});