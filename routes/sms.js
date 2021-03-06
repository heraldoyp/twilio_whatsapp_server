// define dependencies
var sms = require('../modules/sms');
var db = require('../modules/db');
var de = require('../modules/de');

// define external key
const externalKeyDEResponse = '482C0F2F-73E3-48EA-BE95-5261473004E2';
const externalKeyDEStatusCallback = 'A58666A7-F118-409E-BB29-950BF12AF3DD'; // depcrecated

exports.send = async function(req, res) {
    // get request body
    let smsRequestBody = {
        body: req.body.messageBody,
        to: req.body.messageTo
    };

    // send sms
    let smsSend = await sms.send(smsRequestBody);
    let insertDE;

    if (smsSend.status === 200) {
        // define response body
        let smsResponseBody = {
            sid: smsSend.body.sid,
            account_sid: smsSend.body.accountSid,
            api_version: smsSend.body.apiVersion,
            body: smsSend.body.body,
            date_created: smsSend.body.dateCreated,
            date_sent: smsSend.body.dateSend,
            date_updated: smsSend.body.dateUpdated,
            direction: smsSend.body.direction,
            error_code: smsSend.body.errorCode,
            error_message: smsSend.body.errorMessage,
            from: smsSend.body.from,
            messaging_service_sid: smsSend.body.messagingServiceSid,
            num_media: smsSend.body.numMedia,
            num_segments: smsSend.body.numSegments,
            price: smsSend.body.price,
            price_unit: smsSend.body.priceUnit,
            status: smsSend.body.status,
            to: smsSend.body.to,
            subresource_uris: JSON.stringify(smsSend.body.subresourceUris),
            uri: smsSend.body.uri
        };

        // insert response to de
        insertDE = await de.insert(smsResponseBody, externalKeyDEResponse);
    } else {
        insertDE = {status: 400};
    };

    console.log(smsSend);
    console.log(insertDE);

    res.send(smsSend);
};

// callback insert into data extension (deprecated)
// exports.callback = async function(req, res) {
//     let id = await db.getStatusCallbackID(externalKeyDEStatusCallback);

//     if (id !== '') {
//         let statusCallback = {
//             id: id,
//             message_sid: req.body.MessageSid,
//             message_status: req.body.MessageStatus,
//             messaging_service_sid: req.body.MessagingServiceSid,
//             from: req.body.From,
//             to: req.body.To,
//             account_sid: req.body.AccountSid,
//             sms_sid: req.body.SmsSid,
//             sms_status: req.body.SmsStatus,
//             api_version: req.body.ApiVersion
//         };
//         let insertDE = await de.insert(statusCallback, externalKeyDEStatusCallback);

//         if (insertDE.status === 200) {
//             db.update('status_callback_id', id);
//         };
    
//         console.log(insertDE);
//     };

//     // send response to webhook (twilio)
//     res.sendStatus(200);
// };

// callback insert into database
exports.callback = async function(req, res) {
    let id = `NEXTVAL('seq_status_callback_id')`;
    
    db.insert('twilio_sms_status_callback', `id,message_sid,message_status,messaging_service_sid,"from","to",account_sid,sms_sid,sms_status,api_version`, `${id},'${req.body.MessageSid}','${req.body.MessageStatus}','${req.body.MessagingServiceSid}','${req.body.From}','${req.body.To}','${req.body.AccountSid}','${req.body.SmsSid}','${req.body.SmsStatus}','${req.body.ApiVersion}'`);

    // send response to webhook (twilio)
    res.sendStatus(200);
};