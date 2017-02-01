const Joi = require('joi');


const moveClass = Joi.object().keys({
    to: Joi.any().only('mlClasses', 'mlModel').required(),
    from: Joi.any().only('mlClasses', 'mlModel').required()
});

module.exports = {
    move(req, res, next) {
        Joi.validate(req.body, moveClass, (err, value) => {
            if (err) { return res.send(err); }
            next();
        });
    }
}