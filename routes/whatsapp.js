var whatsapp = require('../modules/whatsapp');

exports.send = function(req, res) {
    
    console.log(req.body.inArguments[0]);
    res.send("ini dari whastapp send")
};

exports.callback = function(req, res) {

};