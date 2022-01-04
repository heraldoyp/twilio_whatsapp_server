// define dependencies
var axios = require('axios');
var db = require('./db');
var de = require('./de');

// get twilio credentials from environment
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_PHONE_NUMBER;
const msgService = process.env.TWILIO_MSG_SERVICES;

// send sms
exports.send = async function(data) {
    const client = require('twilio')(accountSid, authToken);

    return client.messages
    .create({
        body: data.body,
        to: data.to,
        from: from,
        messagingServiceSid: msgService,
        statusCallback: 'https://fa-gateway-twilio.herokuapp.com/api/sms/callback',
    })
    .then(success => {
        return {status: 200, body: success};
    })
    .catch(error => {
        return {status: 400, body: error};
    });
};