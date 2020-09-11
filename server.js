const http = require('http');
const express = require('express');

const hostname = '127.0.0.1';
const port = 8080;

const app = new express();

app.use("/src", express.static('./src/'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// const server = http.createServer((req, res) => {
//   res.write(index.html)
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
