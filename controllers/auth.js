const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./../models/User');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status-codes');

exports.signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(httpStatus.CONFLICT).json({
                    message: 'Mail exists',
                    success: false,
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                            success: false,
                            message: 'Internal Server Error'
                        });
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || "",
                        });
                        user.save()
                            .then(result => {
                                // console.log(result);
                                const token =  jwt.sign({
                                    email: result.email,
                                    userId: result._id
                                }, 
                                process.env.JWT_KEY,
                                {
                                    expiresIn: "1h",
                                });
                                res.status(httpStatus.CREATED).json({
                                    message: 'User created',
                                    token: token,
                                    success: true,
                                });
                            })
                            .catch(err => {
                                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                                    success: false,
                                    message: 'Internal Server Error'
                                })
                            })
                    }
                });
            }
        })    
}

exports.login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(httpStatus.UNAUTHORIZED).json({
                    success: false,
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(httpStatus.UNAUTHORIZED).json({
                        success: false,
                        message: 'Auth failed'
                    })
                }

                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h",
                    });
                    return res.status(httpStatus.OK).json({
                        message: 'Auth successful',
                        token: token,
                        user: {
                            _id: user[0]._id,
                            email: user[0].email,
                            firstName: user[0].firstName,
                            lastName: user[0].lastName
                        },
                        success: true,
                    });
                }

                return res.status(httpStatus.UNAUTHORIZED).json({
                    message: 'Auth failed',
                    success: false,
                })
            });
        })
        .catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Internal Server Error'
            })
        });
}