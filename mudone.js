'user strict';

const Room = require('./room');
const User = require ('./user');
const InputHandler = require('./input-handler');

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('assets'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

const room = new Room();
const inputHandler = new InputHandler(room);

io.on('connection', function(socket){
    const user = new User(socket);
    room.addUser(user);

    socket.on('chat message', function(msg){
        console.log('message from', user.getName(), ':', msg);
        inputHandler.processInput(user, msg, io, socket);
    });

    socket.on('disconnect', function(){
        room.removeUser(user);
    });
});

http.listen(9000, function(){
    console.log('listening on *:9000');
});