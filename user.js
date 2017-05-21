'user strict';

const shortid = require('shortid');
const Chance = require('chance');
const chance = new Chance();

class User {

    constructor(socket, name) {
        this.socket = socket;
        this.id = shortid.generate();
        this.name = name || chance.first();
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getSocket() {
        return this.socket;
    }
}

module.exports = User;