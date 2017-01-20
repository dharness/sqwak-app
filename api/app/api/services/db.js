const MongoClient = require('mongodb').MongoClient;


module.exports = new Promise((resolve, reject) => {

    const url = 'mongodb://mongo:27017/sqwak';

    MongoClient.connect(url, (err, db) => {
        if (err) { return reject(err); }
        resolve(db);
    });
});