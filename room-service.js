'use strict';

const apiai = require('apiai');
const app = apiai(process.env.API_AI_KEY);
const options = {
    sessionId: '123'
};

class RoomService {

    getResponse(message) {
        return new Promise(function (resolve, reject) {
            const request = app.textRequest(message, options);

            request.on('response', function(response) {
                console.log(response);
                resolve(response);
            });

            request.on('error', function(error) {
                reject(error);
            });

            request.end();
        });
    }

}

module.exports = RoomService;