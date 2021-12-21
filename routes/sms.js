var sms = require('../modules/sms');

exports.send = function(req, res) {
    var data = {
        body: req.body.messageBody,
        to: req.body.messageTo,
    };
    var result = sms.preSend(data);

    console.log('---start final result---');
    console.log(result);
    console.log('---end final result---');
    res.send(result);
};

exports.callback = function(req, res) {
    console.log('---start callback---');
    console.log(req.body.MessageSid);
    console.log(req.body.MessageStatus);
    console.log('---end callback---');

    res.sendStatus(200);
};