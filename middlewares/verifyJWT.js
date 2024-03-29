const httpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        // console.log(decoded);
        next();
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            message: 'Auth failed',
            success: false
        })
    }
}