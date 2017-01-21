const missingToken = (req, res, next) => {
    return res.status(403).json({
        "error": "Missing token",
        "message": `
        You must have a token in one of the following places:
        - The key access_token in the request body.
        - The key access_token in the request params.
        - The value from the header Authorization: Bearer <token>.
        `
    });
};

module.exports = missingToken;