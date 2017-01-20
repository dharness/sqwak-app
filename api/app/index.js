const fs = require( 'fs' );
const app = require('./app');
const winston = require('winston');
const PORT = process.env.PORT || 8080;
var sqwak = { app };
const logs = [];

winston.level = 'debug';

/**
 * Loads every file in the config directory and makes it available
 * on the gloabl sqwak object
 */
function loadConfig(sqwak) {
    sqwak.config = {};
    return new Promise((resolve, reject) => {
        const baseDir = './config'
        const files = fs.readdirSync(baseDir);
        files.forEach((fileName) => {
            const module = require(`${baseDir}/${fileName}`);
            const moduleName = fileName.split('.')[0];
            sqwak.config[moduleName] = module;
            logs.push(`Loaded: ${fileName}`);
        });
        resolve(sqwak);
    });
}

/**
 * Connect and initialize the db
 */
function initDB (sqwak) {
    const MongoClient = require('mongodb').MongoClient;
    const url = 'mongodb://mongo:27017/sqwak';

    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) { return reject(err); }
            sqwak.db = db;
            logs.push(`Initialized databse at: ${url}`);
            resolve(sqwak);
        });
    });
}

const duck = `
                   ..
                  ( '\`<
                   ) (
            ( ----'  '.
            (         ;
            (_______,'
        ~^~^~^~^~^~^~^~^~^~^~   
`;

const title = `
   _____                     _    
  / ____|                   | |   
 | (___   __ ___      ____ _| | __
  \\___ \\ / _\` \\ \\ /\\ / / _\` | |/ /
  ____) | (_| |\ V  V | (_| |   < 
 |_____/ \\__, | \\_/\\_/ \\__,_|_|\\_\\
            | |                   
            |_|                   
`;

loadConfig(sqwak)
    .then(sqwak => initDB(sqwak))
    .then(sqwak => {
        global.sqwak = sqwak;
        global.sqwak.app.listen(PORT, () => {
            console.log(`
            ${title}
            ${duck}
            Server listening on ${PORT}`);
            console.log(logs);
        });
    });