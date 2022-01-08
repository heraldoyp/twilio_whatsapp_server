var whatsapp = require('../modules/whatsapp');
var util = require('util');

// customActivity.js main arguments
exports.execute = async function (req, res) {
    let waRequestBody = {
        body: req.body.inArguments[0]
    }
    console.log(JSON.stringify(waRequestBody));
    res.status(200).send("Execute Success")
    //var sendWhatsapp = await whatsapp.send(waRequestBody);

    // if(sendWhatsapp.status == 200){
    //     waResponseBody = {
    //         "sid": sendWhatsapp.sid,
    //         "date_created": sendWhatsapp.date_created,
    //         "date_updated": sendWhatsapp.date_updated,
    //         "date_sent": sendWhatsapp.date_sent,
    //         "account_sid": sendWhatsapp.account_sid,
    //         "to": sendWhatsapp.to,
    //         "from": sendWhatsapp.from,
    //         "messaging_service_sid": sendWhatsapp.messaging_service_sid,
    //         "body": sendWhatsapp.body,
    //         "status": sendWhatsapp.status,
    //         "num_segments": sendWhatsapp.num_segments,
    //         "num_media": sendWhatsapp.num_media,
    //         "direction": sendWhatsapp.direction,
    //         "api_version": sendWhatsapp.api_version,
    //         "price": sendWhatsapp.price,
    //         "price_unit": sendWhatsapp.price_unit,
    //         "error_code": sendWhatsapp.error_code,
    //         "error_message": sendWhatsapp.error_message,
    //         "uri": sendWhatsapp.uri,
    //         "subresource_uris": JSON.stringify(sendWhatsapp.subresource_uris)
    //     }

    //     console.log(waResponseBody)
    //     logData(req);
    //     res.status(200).send("Execute");    
    // }else{
    //     res.status(400).send("Execute Error");   
    // }
}


exports.save = async function (req, res) {
    logData(req);
    res.status(200).send("Save");
};

exports.publish = async function (req, res) {
    logData(req);
    res.status(200).send("Publiah");
}

exports.stop = async function (req, res) {
    logData(req);
    res.status(200).send("Stop");
}

exports.validate = async function (req, res) {
    logData(req);
    res.status(200).send("Validate");
}

// callback insert to database
exports.callback = function(req, res) {

};

//custom function for debugging
exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
      body: req.body,
      headers: req.headers,
      trailers: req.trailers,
      method: req.method,
      url: req.url,
      params: req.params,
      query: req.query,
      route: req.route,
      cookies: req.cookies,
      ip: req.ip,
      path: req.path,
      host: req.host,
      fresh: req.fresh,
      stale: req.stale,
      protocol: req.protocol,
      secure: req.secure,
      originalUrl: req.originalUrl,
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}
