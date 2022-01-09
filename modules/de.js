// define dependencies
var axios = require('axios');
var db = require('./db');
require('dotenv').config(); // Uninstall dan apus code sebelum publish

// define endpoint api
const auth_url = process.env.DE_AUTH_URL;
const rest_instance_url = process.env.DE_REST_INSTANCE_URL;

// request new access_token
async function renewToken() {
    return axios.post(auth_url + '/v2/token', {
        headers: {
            'Content-Type': process.env.DE_CONTENT_TYPE
        },
        grant_type: process.env.DE_GRANT_TYPE,
        client_id: process.env.DE_CLIENT_ID,
        client_secret: process.env.DE_CLIENT_SECRET,
        account_id: process.env.DE_ACCOUNT_ID
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
    
        
    // check if error cause not authorized, renew access_token & update to db > recall insert method
    // nice to have cronjob for renew access_token, we can add it later :)
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

// insert to data extension
exports.upsert = async function insert(data, externalKeyDE) {
    let result;
    let access_token = await db.getToken();
    let newToken;

    await axios.put(rest_instance_url + 'data/v1/async/dataextensions/key:' + externalKeyDE + '/rows',    
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
    
        
    // check if error cause not authorized, renew access_token & update to db > recall insert method
    // nice to have cronjob for renew access_token, we can add it later :)
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