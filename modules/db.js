// define dependencies
const { Pool } = require('pg');
require('dotenv').config(); // Uninstall package dan apus code sebelum publish

// create connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

// update record
exports.update = function(key, value) {
    pool.query("UPDATE sfmc_logs SET value = '" + value + "' WHERE key = '" + key + "'", (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(key + ' successfully updated.');
        };
    });
};

// get access_token
exports.getToken = function() {
    return new Promise (function(resolve, reject) {
        pool.query("SELECT value FROM sfmc_logs WHERE key = 'access_token'", (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.rows[0].value);
            };
        });
    });
};

// auto increment for callback ID (deprecated)
// exports.getStatusCallbackID = function() {
//     return new Promise (function(resolve, reject) {
//         pool.query("SELECT value FROM sfmc_logs WHERE key = 'status_callback_id'", (err, res) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(parseInt(res.rows[0].value) + 1);
//             };
//         });
//     });
// };

// insert record
exports.insert = function(table, column, value) {
    console.log("INSERT INTO " + table + " (" + column + ") VALUES (" + value + ")");

    pool.query("INSERT INTO " + table + " (" + column + ") VALUES (" + value + ")", (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Successfully inserted into ' + table + '.');
        };
    });
};