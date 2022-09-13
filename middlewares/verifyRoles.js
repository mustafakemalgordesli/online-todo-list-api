const mongoose = require('mongoose');
const User = require('../models/user');
const httpStatus = require('http-status-codes');


module.exports = (...roles) => {
    return (req, res, next) => {
        try {
            console.log(req.userData);
            User.find({ _id: req.userData.userId })
            .exec()
            .then(user => {
                console.log(user);
                if(user < 1) {
                    return res.status(httpStatus.UNAUTHORIZED).json({ message : "Auth failed"})
                }
                if(roles.some(r => r == user[0].role)) {
                    next();
                } else {
                    return res.status(httpStatus.UNAUTHORIZED).json({ message : "Auth failed"})
                }
            })
            .catch(err => {
                return res.status(httpStatus.UNAUTHORIZED).json({ message : "Auth failed"})
            });
        } catch (error) {
            res.status(httpStatus.UNAUTHORIZED).json({ message : "Auth failed"})
        }
    }
}