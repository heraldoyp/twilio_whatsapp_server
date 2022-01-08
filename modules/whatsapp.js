// define dependencies
var axios = require('axios');
var db = require('./db');
var de = require('./de');
var twilio = require('twilio');

// var data = {
//     "Message": "Hello ini hardcode dari server-side",
//     "Sender": "14155238886",
//     "PhoneNumber": "6285719752942"
// }

// Send Whatsapp Message
exports.send = async function(data) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID; 
    const authToken = process.env.TWILIO_AUTH_TOKEN; 
    //const client = twilio(accountSid, authToken); 
 
    
    // client.messages 
    // .create({ 
    //     body: data.Message, 
    //     from: 'whatsapp:+'+data.Sender,       
    //     to: 'whatsapp:+'+data.PhoneNumber
    // }) 
    // .then(response => {
    //     console.log(response);
    //     return {status: 200, body: response};
    // }) 
    // .catch(error => {
    //     console.log(error)
    //     return {status: 400, body: error};
    // });
    console.log("Account SID :"+accountSid);
    console.log("Auth Token :"+authToken);
    console.log(JSON.stringify(data));
};

// console.log(JSON.stringify(this.send(data)));