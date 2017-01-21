const classController = require('express').Router();


classController.get('/', (req, res) =>{
    res.send(["class1", "class2"]);
});

module.exports = classController;