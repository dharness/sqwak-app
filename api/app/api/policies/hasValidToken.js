const jwt = require('jsonwebtoken');


function validateToken(req, res, next) {
    if (!req.token) {
        return res.missingToken();
    }
    jwt.verify(req.token, 'cr74a-kMRMx1zNbMGWSG8UYo95kow2whmuIhWSE2gR-uG7dsl5GPdBrKBGLn1EjH', (err, decoded) => {
        if (err) {
            console.log(err)
            return res.invalidToken();
        }
        next();
    });
}

module.exports = validateToken;