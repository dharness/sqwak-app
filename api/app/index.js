const fs = require( 'fs' );
const server = require('./server');
const PORT = process.env.PORT || 8080;
var sqwak = { server };

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
    Promise.all(promises).then(results => {
        sqwak = results.reduce((merged, config) => Object.assign(merged, config), sqwak);
        global.sqwak = sqwak;
        sqwak.server.listen(PORT, () => {
            const message = sqwak._message;
            delete sqwak._message;
            console.log(` ${message}\n       Server listening on ${PORT}`);
        });
    })
    .catch(error => console.log(error));
}

loadConfig(sqwak).then(promises => bootstrap(promises));