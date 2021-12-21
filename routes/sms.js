var sms = require('../modules/sms');

exports.send = function(req, res) {
    var data = {
        body: req.body.messageBody,
        to: req.body.messageTo,
    };
    var result = sms.send(data);

    console.log(result);
    res.send(result);
};

exports.callback = function(req, res) {
    console.log('---start callback---');
    console.log(req.body.MessageSid);
    console.log(req.body.MessageStatus);
    console.log('---end callback---');

    res.sendStatus(200);
};