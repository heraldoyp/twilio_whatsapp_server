var axios = require('axios');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_PHONE_NUMBER;
const msgService = process.env.TWILIO_MSG_SERVICES;

exports.send = async function(data) {
    const client = require('twilio')(accountSid, authToken);

    return client.messages
    .create({
        body: data.body,
        to: data.to,
        from: from,
        messagingServiceSid: msgService,
        // statusCallback: 'https://fa-gateway-twilio.herokuapp.com/api/sms/callback',
    })
    .then(success => {
        return {status: 200, body: success};
    })
    .catch(error => {
        return {status: 400, body: error};
    });
};

async function tokenDE() {
    return axios.post('https://mcx3dk6gqx05byn626r3yqc9-hl0.auth.marketingcloudapis.com/v2/token', {
        headers: {
            'Content-Type': 'application/json'
        },
        grant_type: 'client_credentials',
        client_id: 'u5tcbvwgpy4b4a6wefyf1jij',
        client_secret: 'SowaSYrKPmM7ZLzEBE3A0DBc',
        account_id: '110006474'
    })
    .then(success => {
        return {status: 200, body: success};
    })
    .catch(error => {
        return {status: 400, body: error};
    });
};

exports.insertDE = async function(data, externalKeyDE) {
    let token = await tokenDE();
    let access_token;
    let rest_instance_url;

    if (token.body.data === undefined) {
        return {error: 'Failed to get access_token.'};
    } else {
        access_token = token.body.data.access_token;
        rest_instance_url = token.body.data.rest_instance_url;
        
        return axios.post(rest_instance_url + 'data/v1/async/dataextensions/key:' + externalKeyDE + '/rows',    
            {
                items: [data]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token
                }
            }
        )
        .then(success => {
            return {status: 200, body: success};
        })
        .catch(error => {
            return {status: 400, body: error};
        });
    };
};

// auto increment for ID
exports.generateID = async function(externalKeyDE) {
    let token = await tokenDE();
    let access_token;
    let rest_instance_url;

    if (token.body.data === undefined) {
        return '';
    } else {
        access_token = token.body.data.access_token;
        rest_instance_url = token.body.data.rest_instance_url;
        
        return axios.get(rest_instance_url + 'data/v1/customobjectdata/key/' + externalKeyDE + '/rowset?$page=1&$pagesize=1',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token
                }
            }
        )
        .then(success => {
            return success.data.count + 1;
        })
        .catch(error => {
            return '';
        });
    };
};