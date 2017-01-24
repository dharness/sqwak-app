/**
 * Connect and initialize the db
 */
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const url = 'mongodb://mongo:27017/sqwak';

mongoose.Promise = global.Promise;


module.exports = function(sqwak) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) { return reject(err); }
            mongoose.connect(url);
            resolve({db, mongoose});
        });
    });
};