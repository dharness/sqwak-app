const userController = require('express').Router();
const validators = require('./../validators/user');
const User = require('./../models/User');


userController.get('/:id', (req, res) => {
    User.findOne({_id: req.params.id}, (err, user) => {
        if (err) { return res.send(err); }
        res.send(user);
    });
});

userController.post('/', validators.create, (req, res) => {
    const userId = req.body.user_id.split('|')[1];
    const user = new User({ _id: userId });
    user.save((err, docs) => {
        if (err) { return res.send(err); }
        res.send(docs);
    });
});

module.exports = userController;