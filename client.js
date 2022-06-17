const { io } = require("socket.io-client")

var socket = io("http://localhost:3000", {
    auth: {
        userId: "client1"
    }
})

socket.on('connect', () => {
    console.log("connected")
    
})

socket.on('msg', (msg) => {
    console.log("msg: "+ msg)
})

socket.on("broadcast", (msg) => {
    console.log(msg)
})