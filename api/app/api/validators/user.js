const Joi = require('joi');


const createUserPostBody = Joi.object().keys({
    user_id: Joi.string().required()
});


module.exports = {
    create(req, res, next) {
        Joi.validate(req.body, createUserPostBody, (err, value) => {
            if(err) { return res.send(err); }
            next();
        });
    }
}