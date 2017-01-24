const userController = require('express').Router();
const validators = require('./../validators/user');
const User = require('./../models/User');


userController.post('/', validators.create, (req, res) => {
    const userId = req.body.user_id.split('|')[1];
    const user = new User({ userId });
    user.save((err, docs) => {
        if (err) { return res.send(err); }
        res.send(docs);
    });
});

module.exports = userController;