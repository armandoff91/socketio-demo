const { io } = require("socket.io-client")

var socket = io("http://localhost:3000", {
    auth: {
        userId: "client2"
    }
})

socket.on('connect', () => {
    console.log("connected")
    setInterval(() => {
        socket.emit("msg", {
            receipient: "client1",
            msg: "hi I am client 2"
        })
    }, 1000)

})

socket.on('msg', (msg) => {
    console.log("msg: "+ msg)
})