const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("server 2 speaking")
});


app.listen(4000, () => {
  console.log('listening on *:3000');
});