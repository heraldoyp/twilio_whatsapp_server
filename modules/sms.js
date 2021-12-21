const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_PHONE_NUMBER;
const msgService = process.env.TWILIO_MSG_SERVICES;

async function preSend(data) {
    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
        body: data.body,
        to: data.to,
        from: from,
        messagingServiceSid: msgService,
        statusCallback: 'https://fa-server-0.herokuapp.com/api/sms/callback',
    })
    .then(message => {
        // console.log(message);
        // res.send(message);
        return message;
    })
    .catch(error => {
        // console.log(error);
        // res.send(error);
        return error;
    });
};

exports.send = async function(data) {
    var result = await preSend(data);
    
    console.log(result);
};