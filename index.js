// index.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello World from me  ');
});

server.listen(process.env.PORT || 3000);

