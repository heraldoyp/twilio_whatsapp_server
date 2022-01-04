'use strict';

// define dependencies
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
var sms         = require('./routes/sms');
var whatsapp    = require('./routes/whatsapp');

// config express
var app = express();

app.set('port', process.env.PORT || 3000);

// handle body request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// define routes
app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('This is sms & whatsapp gateway (twilio).');
})

app.post('/api/sms/send', sms.send);
app.post('/api/sms/callback', sms.callback);

app.post('/api/whatsapp/send', whatsapp.send);
app.post('/api/whatsapp/callback', whatsapp.callback);

// create server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});