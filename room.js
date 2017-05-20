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
        _.remove(this.users, u => u.getId() === user.getId());
        console.log(user.getName(), 'removed from room. Now', this.users.length, 'users in room');
    }

    getUserNames() {
        return this.users.map(user => user.getName()).join(', ');
    }

    getUser() {
        return this.users;
    }
}

module.exports = Room;