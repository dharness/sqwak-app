const Joi = require('joi');


const createAppPostBody = Joi.object().keys({
    appName: Joi.string()
});

module.exports = {
    create(req, res, next) {
        Joi.validate(req.body, createAppPostBody, (err, value) => {
            if(err) { return res.send(err); }
            next();
        });
    }
}