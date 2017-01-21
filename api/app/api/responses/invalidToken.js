const invalidToken = (req, res, next) => {
    return res.status(401).json({
        "error": "Unauthorized: Invalid Token",
        "message": "The token is malformed or invalid."
    });
};

module.exports = invalidToken;