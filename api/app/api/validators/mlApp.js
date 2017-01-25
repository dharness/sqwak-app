const Joi = require('joi');


const createAppPostBody = Joi.object().keys({
    appName: Joi.string()
});

const createAppPostBody2 = Joi.object().keys({
    appName: Joi.string(),
    id: Joi.string(),
    updatedAt: Joi.date(),
    createdAt: Joi.date(),
    queryUrl: Joi.string(),
    metrics: Joi.object(),
    model : Joi.object()
});

module.exports = {
    create(req, res, next) {
        Joi.validate(req.body, createAppPostBody, (err, value) => {
            if(err) { return res.send(err); }
            next();
        });
    }
}