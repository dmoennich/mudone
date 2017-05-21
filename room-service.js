'use strict';

const apiai = require('apiai');
const app = apiai(process.env.API_AI_KEY);

class RoomService {

    getResponse(message, sessionId) {
        return new Promise(function (resolve, reject) {
            const request = app.textRequest(message, {sessionId: sessionId});

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