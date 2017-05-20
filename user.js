'user strict';

const shortid = require('shortid');

class User {

    constructor(name) {
        this.name = name || shortid.generate();
    }

    getName() {
        return this.name;
    }
}

module.exports = User;