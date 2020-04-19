const express = require('express');
const path = require('path');

const socketIO = require('socket.io');
const http = require('http');

const app = express();
let server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(require('./routes/index'));

module.exports.io = socketIO(server);
require('./sockets/socket');

const serverPort = process.env.PORT || 3000;
server.listen(serverPort, () => console.log(`Listening on port ${serverPort}`));
