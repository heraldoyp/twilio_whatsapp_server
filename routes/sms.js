var sms = require('../modules/sms');

exports.send = async function(req, res) {
    let data = {
        body: req.body.messageBody,
        to: req.body.messageTo,
    };

    await sms.send(data)
    .then(function(result) {
        console.log('---start res result---');
        console.log(result);
        console.log('---end res result---');
        res.send(result);
    });
};

exports.callback = function(req, res) {
    console.log('---start callback---');
    console.log(req.body.MessageSid);
    console.log(req.body.MessageStatus);
    console.log('---end callback---');

    res.sendStatus(200);
};