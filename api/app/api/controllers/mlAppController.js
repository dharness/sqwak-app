const mlAppController = require('express').Router();
const hasValidToken = require('./../policies/hasValidToken');
const loadUser = require('./../policies/loadUser');


mlAppController.use(hasValidToken);
mlAppController.use(loadUser);

mlAppController.get('/', (req, res) => {
    res.send("mlAppController");
});

module.exports = mlAppController