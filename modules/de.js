// define dependencies
var axios = require('axios');
var db = require('./db');

// define url
const auth_url = 'https://mcx3dk6gqx05byn626r3yqc9-hl0.auth.marketingcloudapis.com';
const rest_instance_url = 'https://mcx3dk6gqx05byn626r3yqc9-hl0.rest.marketingcloudapis.com/';

// request new access_token
async function renewToken() {
    return axios.post(auth_url + '/v2/token', {
        headers: {
            'Content-Type': 'application/json'
        },
        grant_type: 'client_credentials',
        client_id: 'u5tcbvwgpy4b4a6wefyf1jij',
        client_secret: 'SowaSYrKPmM7ZLzEBE3A0DBc',
        account_id: '110006474'
    })
    .then(success => {
        // update access_token to database
        db.update('access_token', success.data.access_token);

        return {status: 200, body: success};
    })
    .catch(error => {
        return {status: 400, body: error};
    });
};

// insert to data extension
exports.insert = async function insert(data, externalKeyDE) {
    let result;
    let access_token = await db.getToken();
    let newToken;

    await axios.post(rest_instance_url + 'data/v1/async/dataextensions/key:' + externalKeyDE + '/rows',    
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
            result = {status: 200, body: success};
        })
        .catch(error => {
            result = {status: 400, body: error};
        });
    
    if (result.status === 400) {
        if (result.body.response.status === 401) {
            newToken = await renewToken();

            if (newToken.status === 200) {
                console.log(newToken.body.data.access_token);
                insert(data, externalKeyDE);
                return newToken.body.data.access_token;
            } else {
                console.log('Failed to get access_token.');
                return 'Failed to get access_token.';
            };
        };
    };

    console.log(result);
    return result;
};