var Joi = require('joi');

var classSchema = {
    post: Joi.object().keys({
        className: Joi.string(),
    }).without('type')
};
