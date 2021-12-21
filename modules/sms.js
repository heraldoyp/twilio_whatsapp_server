const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_PHONE_NUMBER;
const msgService = process.env.TWILIO_MSG_SERVICES;

exports.preSend = async function preSend(data) {
    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
        body: data.body,
        to: data.to,
        from: from,
        messagingServiceSid: msgService,
        // statusCallback: 'https://fa-gateway-twilio.herokuapp.com/api/sms/callback',
    })
    .then(message => {
        console.log('---start preSend message---');
        console.log(message);
        console.log('---end preSend message---');
        return message;
    })
    .catch(error => {
        console.log('---start preSend error---');
        console.log(error);
        console.log('---end preSend error---');
        return error;
    });
};

exports.send = async function(data) {
    var result = await preSend(data);
    
    console.log('---start send result---');
    console.log(result);
    console.log('---end send result---');
    return result;
};