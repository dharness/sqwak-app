const jwt = require('jsonwebtoken');


function loadUser(req, res, next) {
    var decoded = jwt.decode(req.token, {complete: true});
    if (decoded && decoded.payload && decoded.payload.sub) {
        const userId = decoded.payload.sub.split('|')[1];
        req.userId = userId;
    }
    next();
}

module.exports = loadUser;