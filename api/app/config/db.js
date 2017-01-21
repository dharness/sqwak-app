/**
 * Connect and initialize the db
 */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://mongo:27017/sqwak';


module.exports = function(sqwak) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) { return reject(err); }
            resolve({db});
        });
    });
}