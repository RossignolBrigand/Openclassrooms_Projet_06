/// Decodes the token to get the userId and attach it to our req.auth.userId to be passed down to the next functions that need to check for authorization

const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

//-----------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const token = req.headers.authorization.split(' ')[1];
        // Check token validity and return decoded payload
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // Set the authorization to be the decoded userId
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    }
    catch (error) {
        res.status(401).json({ error });
    }
};