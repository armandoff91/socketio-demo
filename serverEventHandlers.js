const msgHandler = (obj, callback) => {
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
} 