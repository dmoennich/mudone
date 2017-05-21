const _ = require('lodash');
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
                case 'start-conversation':
                    return this.processStartConversation(user, io, socket, response);
                case 'stop-conversation':
                case 'input.unknown':
                case 'welcome':
                    return socket.emit('chat message', response.result.fulfillment.speech);
                default:
                    return socket.emit('chat message', 'hm...');
            }
        });
    }

    processStartConversation(user, io, socket, response) {
        const desiredConversationTarget = response.result.parameters.conversationTarget;
        const desiredConversationTargetLc = desiredConversationTarget && desiredConversationTarget.toLowerCase();
        const actualConversationTarget = _.find(this.room.getUsers(), u => u.getName().toLowerCase() === desiredConversationTargetLc);
        if (actualConversationTarget) {
            return socket.emit('chat message', response.result.fulfillment.speech);
        }
        return socket.emit('chat message', `Sorry, there is noone here named ${desiredConversationTarget}`);
    }

}

module.exports = InputHandler;