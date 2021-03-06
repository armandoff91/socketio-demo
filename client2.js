const { io } = require("socket.io-client")

var socket = io("http://localhost:3000", {
    auth: {
        userId: "client2"
    }
})

socket.on('connect', () => {
    console.log("connected")
    // setInterval(() => {
    // }, 1000)
    socket.emit("msg", {
        id: Math.floor(Math.random() * 100000),
        sender: "client2",
        receipient: "client1",
        msg: "hi I am client 2"
    }, (res)=> {
        if (res === "OK") {
            console.log("1 grey tick")
        }
        if (res === "NOT OK") {
            console.log("save resend the message")
        }
    })

})

socket.on('msg', (msg) => {
    console.log("msg: "+ msg)
})

socket.on("received", (obj) => {
    console.log("blue tick: " + obj.id)
})