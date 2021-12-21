var sms = require('../modules/sms');

exports.send = async function(req, res) {
    var data = {
        body: req.body.messageBody,
        to: req.body.messageTo,
    };
    var result = await sms.send(data);

    console.log('---start send result---');
    console.log(result);
    console.log('---end send result---');
    res.send(result);
};

exports.callback = function(req, res) {
    console.log('---start callback---');
    console.log(req.body.MessageSid);
    console.log(req.body.MessageStatus);
    console.log('---end callback---');

    res.sendStatus(200);
};