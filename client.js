const { io } = require("socket.io-client")

var socket = io("http://localhost:3000", {
    auth: {
        userId: "client1"
    }
})

socket.on('connect', () => {
    console.log("connected")
    
})

socket.on('msg', (obj) => {
    console.log("msg: ", obj)
    socket.emit("received", {
        id: obj.id,
        receipient: obj.sender,
        time: new Date()
    }, res => {
        if (res === "OK") {
            console.log("blue tick done")
        }
    })
})

socket.on("broadcast", (msg) => {
    console.log(msg)
})