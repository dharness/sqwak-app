const fs = require( 'fs' );
const PORT = process.env.PORT || 8080;
var sqwak = {};


/**
 * Asynchronously loads every module in the config directory
 */
function loadConfig(sqwak) {
    const baseDir = './config';
    const promises = [];

    return new Promise((resolve, reject) => {
        fs.readdir(baseDir, (err, files) => {
            files.forEach((fileName) => {
                const currentModule = require(`${baseDir}/${fileName}`);
                const unresolved = currentModule(sqwak);
                promises.push(unresolved);
            });
            resolve(promises);
        });
    });
}

/**
 * Initializes the gloabl sqwak object and resolves all dependencies
 */
function bootstrap(promises) {
    return Promise.all(promises).then(results => {
        sqwak = results.reduce((merged, config) => Object.assign(merged, config), sqwak);
        global.sqwak = sqwak;
        return sqwak;
    })
}

function start(sqwak) {
    sqwak.server = require('./server');
    sqwak.server.listen(PORT, () => {
        const message = sqwak._message;
        delete sqwak._message;
        console.log(` ${message}\n       Server listening on ${PORT}`);
    });
}

if (require.main === module) {
    loadConfig(sqwak)
        .then(promises => bootstrap(promises))
        .then((sqwak) => {start(sqwak);})
        .catch(error => console.log(error));
}

module.exports = { loadConfig, bootstrap };