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
        statusCallback: 'https://fa-gateway-twilio.herokuapp.com/api/sms/callback',
    })
    .then(success => {
        return success;
    })
    .catch(error => {
        return error;
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
        return success;
    })
    .catch(error => {
        return error;
    });
};

exports.insertDE = async function(data, externalKeyDE) {
    let token = await tokenDE();
    let access_token;
    let rest_instance_url;

    if (token.data !== undefined) {
        access_token = token.data.access_token;
        rest_instance_url = token.data.rest_instance_url;
        
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
            return success;
        })
        .catch(error => {
            return error;
        });
    } else {
        return {error: 'Failed to get access_token.'};
    };
};

// auto increment for ID
exports.generateID = async function(externalKeyDE) {
    let token = await tokenDE();
    let access_token;
    let rest_instance_url;

    if (token.data !== undefined) {
        access_token = token.data.access_token;
        rest_instance_url = token.data.rest_instance_url;
        
        return axios.get(rest_instance_url + 'data/v1/customobjectdata/' + externalKeyDE + '/rowset?$page=1&$pagesize=1',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token
                }
            }
        )
        .then(success => {
            return success.count + 1;
        })
        .catch(error => {
            return '';
        });
    } else {
        return '';
    };
};