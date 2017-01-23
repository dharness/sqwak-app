let chai = require('chai');
let chaiHttp = require('chai-http');
let main = require('./../../index');


process.env.NODE_ENV = 'test';
process.env.PORT = 9090;

chai.use(chaiHttp);
let should = chai.should();
var sqwak = {};
var server;
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2tpbmdvZnRoZXN0YWNrLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ODgxMmY4OGFjNjI0NDE5OWVlZDBkZDQiLCJhdWQiOiJsNHB4ZWpPWGhUT1YzMkJIclp4QVNJSEh1TnE0dXJ3aCIsImV4cCI6MTQ4NTIzMDM5NywiaWF0IjoxNDg1MTk0Mzk3fQ.3l4xU6NjeIW_f0gYYxHJX549uKXDmySM0w-7ZH55aVg";

describe('mlApp', () => {

    beforeEach((done) => {
        main.loadConfig(sqwak)
            .then(promises => main.bootstrap(promises))
            .then((sqwak) => {
                server = require('./../../server');
                done();
            })
            .catch(error => console.log(error));
    });

    it('lololol', (done) => {
        chai.request(server)
        .get('/api/v0/app')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});


console.log("Running tests");