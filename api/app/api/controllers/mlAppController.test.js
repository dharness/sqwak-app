let chai = require('chai');
let chaiHttp = require('chai-http');
let main = require('./../../index');
const Joi = require('joi');


process.env.NODE_ENV = 'test';
process.env.PORT = 9090;

chai.use(chaiHttp);
let expect = chai.expect;
var sqwak = {};
var server;
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2tpbmdvZnRoZXN0YWNrLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ODgxMmY4OGFjNjI0NDE5OWVlZDBkZDQiLCJhdWQiOiJsNHB4ZWpPWGhUT1YzMkJIclp4QVNJSEh1TnE0dXJ3aCIsImV4cCI6MTQ4NTI0ODM4NywiaWF0IjoxNDg1MjEyMzg3fQ.Ao_-LLLmdmKCutLzkl6rrBc6DjpqptHkXlcs89Xr-d8";

describe('mlApp', () => {

    before((done) => {
        main.loadConfig(sqwak)
            .then(promises => main.bootstrap(promises))
            .then((sqwak) => {
                server = require('./../../server');
                done();
            })
            .catch(error => console.log(error));
    });

    describe('GET /app', () => {
        const appResponseScheme = Joi.object().keys({
            appName: Joi.string(),
            id: Joi.string(),
            updatedAt: Joi.date(),
            createdAt: Joi.date(),
            queryUrl: Joi.string(),
            metrics: Joi.object(),
            model : Joi.object()
        });

        it('should return 403 if a token is not provided', (done) => {
            chai.request(server)
            .get('/api/v0/app')
            .set('authorization', ``)
            .end((err, res) => {
                expect(res).to.have.status(403);
                done();
            });
        });

        it('should return an app object', (done) => {
            chai.request(server)
            .get('/api/v0/app')
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                appResponseScheme.validate(res.body, (err, value) => {
                    expect(err).to.be.null;
                    done();
                });
            });
        });
    });
});


console.log("Running tests");