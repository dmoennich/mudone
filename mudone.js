'user strict';

const Room = require('./room');
const User = require ('./user');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

const room = new Room();

io.on('connection', function(socket){
    const user = new User();
    room.addUser(user);
    io.emit('users', room.getUser());


    socket.on('chat message', function(msg){
        console.log('message from', user.getName(), ':', msg);
        // socket.broadcast.emit('hi');
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
        room.removeUser(user);
        io.emit('users', room.getUser());
    });
});

http.listen(9000, function(){
    console.log('listening on *:9000');
});