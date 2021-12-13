'use strict';

// define modules
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');

// config express
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

// define routes
app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('This is twilio server.');
})

app.post('/api/send-sms', (req, res) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_PHONE_NUMBER;
    const msgService = process.env.TWILIO_MSG_SERVICES;

    const client = require('twilio')(accountSid, authToken);

    console.log('---start req---');
    console.log(req);
    console.log('---end req---');

    client.messages
    .create({
        body: 'hardcode val body & to', //req.body.messageBody,
        to: '+6282298524375', //req.body.messageTo,
        from: from,
        messagingServiceSid: msgService,
        statusCallback: 'https://fa-server-0.herokuapp.com/api/status-sms',
    })
    .then(message => {
        // console.log(message);
        res.send(message);
    })
    .catch(error => {
        // console.log(error);
        res.send(error);
    });
});

app.post('/api/status-sms', (req, res) => {
    console.log('---start callback---');
    console.log(req);
    console.log('---end callback---');
});

// create server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});