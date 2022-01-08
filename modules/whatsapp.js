// define dependencies
var axios = require('axios');
var db = require('./db');
var de = require('./de');
var twilio = require('twilio');
var util = require('util');
require('dotenv').config(); // Uninstall sebelum publish

// Send Whatsapp Message
exports.send = async function(data) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID; 
    const authToken = process.env.TWILIO_AUTH_TOKEN; 
    const client = twilio(accountSid, authToken); 

    client.messages 
    .create({ 
        body: data.body.Message, 
        from: 'whatsapp:+'+data.body.Sender,       
        to: 'whatsapp:+'+data.body.PhoneNumber
    }) 
    .then(response => {
        console.log(response);
        return {status: 200, body: response};
    }) 
    .catch(error => {
        console.log(error)
        return {status: 400, body: error};
    });
};
