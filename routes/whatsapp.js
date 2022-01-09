const whatsapp = require('../modules/whatsapp');
const db = require('../modules/db');
const de = require('../modules/de');
const util = require('util');
var dataExtensionSource = "";

// customActivity.js main arguments
exports.execute = async function (req, res) {
    let waRequestBody = {
        body: req.body.inArguments[0]
    }

    // console.log(util.inspect(waRequestBody));
    let sendWhatsapp = await whatsapp.send(waRequestBody);
    let insertDE;
    dataExtensionSource = waRequestBody.body.DataExtensionResponse;

    if(sendWhatsapp.status === 200){
        waResponseBody = {
            "sid": sendWhatsapp.body.sid,
            "date_created": sendWhatsapp.body.dateCreated,
            "date_updated": sendWhatsapp.body.dateUpdated,
            "date_sent": sendWhatsapp.body.dateSent,
            "account_sid": sendWhatsapp.body.accountSid,
            "to": sendWhatsapp.body.to,
            "from": sendWhatsapp.body.from,
            "messaging_service_sid": sendWhatsapp.body.messagingServiceSid,
            "body": sendWhatsapp.body.body,
            "status": sendWhatsapp.body.status,
            "num_segments": sendWhatsapp.body.numSegments,
            "num_media": sendWhatsapp.body.numMedia,
            "direction": sendWhatsapp.body.direction,
            "api_version": sendWhatsapp.body.apiVersion,
            "price": sendWhatsapp.body.price,
            "price_unit": sendWhatsapp.body.priceUnit,
            "error_code": sendWhatsapp.body.errorCode,
            "error_message": sendWhatsapp.body.errorMessage,
            "uri": sendWhatsapp.body.uri,
            "subresource_uris": JSON.stringify(sendWhatsapp.body.subresourceUris)
        }
        // console.log("waResponse =>");
        // console.log(util.inspect(waResponseBody));
        // logData(req);

        insertDE = await de.insert(waResponseBody, waRequestBody.body.DataExtensionResponse);
        res.status(200).send("Execute Success");    
    }else{
        res.status(400).send("Execute Error");   
    }
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
exports.callback = async function(req, res) {
    if(req.body){
        console.log(req.body);
        let upsertDE; 
        
        upsertDE = await de.upsert(req.body, dataExtensionSource);
        res.status(200).send("Callback Success");
    }else{
        res.status(400).send("Callback Error");
    }
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
