/// 
/// 
///


const jwt = require('jsonwebtoken');

//-----------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1];
        const decodedToken = jwt.verify(token, 'BfY9yLXTlOuLZZHOSS9v3vPd52kKdTGt');
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