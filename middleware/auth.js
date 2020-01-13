const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {

    //get token form header
    const token = req.header('x-auth-token');

    //check if not token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}