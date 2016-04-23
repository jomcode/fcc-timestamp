const http = require('http');
const moment = require('moment');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => res.end());

server.listen(port, (err) => {
  if (err) return console.error(err);
  console.log(`server listening on port ${port}`);
});
