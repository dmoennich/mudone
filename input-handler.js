class InputHandler {

    constructor(room) {
        this.room = room;
    }

    processInput(message, io, socket) {
        switch (message) {
            case 'show users':
                return socket.emit('chat message', this.room.getUserNames());
            default:
                return io.emit('chat message', message);
        }
    }

}

module.exports = InputHandler;