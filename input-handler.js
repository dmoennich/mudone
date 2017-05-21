const _ = require('lodash');
const RoomService = require('./room-service');

class InputHandler {

    constructor(room) {
        this.roomService = new RoomService();
        this.room = room;
    }

    processInput(user, message) {
        return this.roomService.getResponse(message).then(response => {
            const action = response.result.action;

            switch (action) {
                case 'people-info':
                    return user.getSocket().emit('chat message', response.result.fulfillment.speech + ' ' +
                        this.room.getUsers()
                            .map(u => u.getName() === user.getName() ? user.getName() + ' (you)' : u.getName())
                            .join(', ')
                    );
                case 'send-message':
                    return this.processSendMessage(user, response);
                case 'input.unknown':
                case 'welcome':
                    return user.getSocket().emit('chat message', response.result.fulfillment.speech);
                default:
                    return user.getSocket().emit('chat message', 'hm...');
            }
        });
    }

    processSendMessage(user, response) {
        const desiredConversationTarget = response.result.parameters.conversationTarget;
        const desiredConversationTargetLc = desiredConversationTarget && desiredConversationTarget.toLowerCase();
        const message = response.result.parameters.message;
        const actualConversationTarget = _.find(this.room.getUsers(), u => u.getName().toLowerCase() === desiredConversationTargetLc);
        if (actualConversationTarget) {
            user.getSocket().emit('chat message', '@' + desiredConversationTarget + ': ' + message);
            return user.getSocket().to(actualConversationTarget.getSocket().id).emit('chat message', user.getName() + ' says: ' + message);
        }
        return user.getSocket().emit('chat message', `Sorry, there is noone here named ${desiredConversationTarget}`);
    }

}

module.exports = InputHandler;