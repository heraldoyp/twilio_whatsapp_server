var sms = require('../modules/sms');

const externalKeyDEResponse = '482C0F2F-73E3-48EA-BE95-5261473004E2';
const externalKeyDEStatusCallback = 'A58666A7-F118-409E-BB29-950BF12AF3DD';

exports.send = async function(req, res) {
    let smsRequestBody = {
        body: req.body.messageBody,
        to: req.body.messageTo
    };
    let smsSend = await sms.send(smsRequestBody);
    let insertDE;

    if (smsSend.status === 200) {
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
            uri: smsSend.body.uri
        };

        insertDE = await sms.insertDE(smsResponseBody, externalKeyDEResponse);
    } else {
        insertDE = {status: 400};
    };

    console.log({sms_send: smsSend, insert_de: insertDE});

    res.send({sms_send: smsSend, insert_de: insertDE});
};

exports.callback = async function(req, res) {
    let id = await sms.generateID(externalKeyDEStatusCallback);

    if (id !== '') {
        let statusCallback = {
            id: id,
            message_sid: req.body.MessageSid,
            message_status: req.body.MessageStatus,
            messaging_service_sid: req.body.MessagingServiceSid,
            from: req.body.From,
            to: req.body.To,
            account_sid: req.body.AccountSid,
            sms_sid: req.body.SmsSid,
            sms_status: req.body.SmsStatus,
            api_version: req.body.ApiVersion
        };
        let insertDE = await sms.insertDE(statusCallback, externalKeyDEStatusCallback);
    
        console.log(insertDE);
    };

    // send response to webhook (twilio)
    res.sendStatus(200);
};