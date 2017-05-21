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
                case 'people-info':
                    return socket.emit('chat message', response.result.fulfillment.speech + ' ' +
                        this.room.getUsers()
                            .map(u => u.getName() === user.getName() ? user.getName() + ' (you)' : u.getName())
                            .join(', ')
                    );
                case 'start-conversation': //TODO check against users
                case 'input.unknown':
                case 'welcome':
                    return socket.emit('chat message', response.result.fulfillment.speech);
                default:
                    return socket.emit('chat message', 'hm...');
            }
        });
    }

}

module.exports = InputHandler;