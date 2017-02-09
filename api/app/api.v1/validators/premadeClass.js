const Joi = require('joi');


const moveClass = Joi.object().keys({
    toAppId: Joi.any().required()
});

module.exports = {
    copy(req, res, next) {
        Joi.validate(req.body, moveClass, (err, value) => {
            if (err) { return res.send(err); }
            next();
        });
    }
}