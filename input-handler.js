const RoomService = require('./room-service');

class InputHandler {

    constructor(room) {
        this.roomService = new RoomService();
        this.room = room;
    }

    processInput(user, message, io, socket) {
        return this.roomService.getResponse(message).then(response => {
            const action = response.result.action;

            switch (action) {
                case 'input.people':
                    return socket.emit('chat message',
                        this.room.getUsers()
                            .map(u => u.getName() === user.getName() ? user.getName() + ' (you)' : u.getName())
                            .join(', ')
                    );
                case 'input.welcome':
                case 'input.unknown':
                    return socket.emit('chat message', response.result.fulfillment.speech);
                default:
                    return io.emit('chat message', 'hm...');
            }
        });
    }

}

module.exports = InputHandler;