const jwt = require('jsonwebtoken');
const User = require('./../models/User');


function loadUser(req, res, next) {
    var decoded = jwt.decode(req.token, {complete: true});
    if (decoded && decoded.payload && decoded.payload.sub) {
        const userId = decoded.payload.sub.split('|')[1];
        User.findOne({_id: userId}, (err, user) => {
            if (err) { return res.send(err); }
            req.user = user;
            next();
        });
    }
}

module.exports = loadUser;