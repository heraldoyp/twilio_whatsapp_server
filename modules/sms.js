const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_PHONE_NUMBER;
const msgService = process.env.TWILIO_MSG_SERVICES;

exports.send = async function send(data) {
    const client = require('twilio')(accountSid, authToken);

    return client.messages
    .create({
        body: data.body,
        to: data.to,
        from: from,
        messagingServiceSid: msgService,
        statusCallback: 'https://fa-gateway-twilio.herokuapp.com/api/sms/callback',
    })
    .then(message => {
        return message;
    })
    .catch(error => {
        return error;
    });
};