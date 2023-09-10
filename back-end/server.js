require('dotenv').config()
const http = require('http');
const app = require('./app');
const port = process.env.PORT || "8080"
const server = http.createServer(app);
server.listen(port,() => {
    console.log(`api listening on port ${port}`)
  });

  module.exports = server;
