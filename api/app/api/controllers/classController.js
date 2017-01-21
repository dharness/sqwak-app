const classController = require('express').Router();
const hasValidToken = require('./../policies/hasValidToken');
const loadUser = require('./../policies/loadUser');
const jwt = require('jsonwebtoken');


classController.use(hasValidToken);
classController.use(loadUser);

classController.get('/', (req, res) => {
    res.send(req.userId);
});

module.exports = classController;