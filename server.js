const { default: axios } = require('axios');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.send("Hello world")
});

io.use((socket, next) => {
  console.log(socket.handshake.auth.userId)
  socket.user = socket.handshake.auth.userId
  
  next()
})
io.on('connection', (socket) => {
  console.log('a user connected', socket.user);
  socket.join(socket.user)
  socket.use((args, next) => {
    // console.log(socket.request)
    next()
      
  })

  socket.on("msg", (obj) => {
    console.log("msg emitted", obj)
    socket.to(obj.receipient).emit("msg", obj.msg)
  })
});
io.on("foo", (socket) => {
    console.log("foo 2")
})
server.listen(3000, () => {
  console.log('listening on *:3000');
});