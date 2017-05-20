const RoomService = require('./room-service');

class InputHandler {

    constructor(room) {
        this.roomService = new RoomService();
        this.room = room;
    }

    processInput(message, io, socket) {
        return this.roomService.getResponse(message).then(response => {
            const intentName = response.result.metadata.intentName;
            switch (intentName) {
                case 'People information':
                    return socket.emit('chat message', this.room.getUserNames());
                case 'Default Welcome Intent':
                    return socket.emit('chat message', response.result.fulfillment.speech);
                default:
                    return io.emit('chat message', message);
            }
        });
    }

}

module.exports = InputHandler;