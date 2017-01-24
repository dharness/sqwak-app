const userController = require('express').Router();


userController.post('/', (req, res) => {
    console.log(req.body);
    res.send(200);
});

module.exports = mlAppController;