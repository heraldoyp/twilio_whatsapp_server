var whatsapp = require('../modules/whatsapp');

// customActivity.js main arguments
exports.execute = async function (req, res) {
    let waRequestBody = {
        body: req.body.inArguments[0]
    }
    console.log(waRequestBody);

    logData(req);
    res.status(200).send("Execute");
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