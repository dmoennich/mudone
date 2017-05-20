'user strict';

const shortid = require('shortid');
const Chance = require('chance');
const chance = new Chance();

class User {

    constructor(name) {
        this.id = shortid.generate();
        this.name = name || chance.name();
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }
}

module.exports = User;