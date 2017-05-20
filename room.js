'use strict';
const _ = require('lodash');

class Room {

    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
        console.log(user.getName(), 'added to room. Now', this.users.length, 'users in room');
    }

    removeUser(user) {
        _.remove(this.users, u => u.getName() === user.getName());
        console.log(user.getName(), 'removed from room. Now', this.users.length, 'users in room');
    }

    getUser() {
        return this.users.map(user => user.getName()).join(', ');
    }
}

module.exports = Room;