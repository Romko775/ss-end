const express = require('express');
const sha256 = require('sha256');
const UsersModel = require('../models/users.model');


const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session);
    res.send('Hello world');
});

/**
 * Login-logout area
 */

//todo: check this if need
router.get('/login', (req, res) => {

});
router.post('/login', (req, res) => {
    if (!req.session.username) {
        const {username, password} = req.body;
        UsersModel.findOne({username, password: sha256(password)})
            .then((data) => {
                if (data) {
                    req.session.username = username;
                    res.status(200).json({
                        error: false,
                        status: 'OK',
                        message: 'Logged successfuly',
                    });
                } else {
                    res.status(403).json({
                        error: true,
                        status: 'Error',
                        message: 'Authentication error',
                    })
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({
                    error: true,
                    status: 'Error',
                    message: error,
                });
            })
    } else {
        res.status(200).json('User already logged');
    }
});

router.post('/isLogged', (req, res) => {
    const {username} = req.body;

    console.log(req.body);
    // console.log(username);
    // console.log(req.session.username);
    // console.log(req.session.username  && req.session.username === username);
    if (req.session.username) {
        res.status(200).json({
           isLogged: true,
           error: false
        });
    } else {
        res.status(200).json({
            isLogged: false,
            error: false
        })
    }
});

router.get('/logout', (req, res) => {
    if (req.session.username) {
        req.session.destroy(error => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.clearCookie('sid');
                res.status(200).json({
                    error: false,
                    status: 'Ok',
                    message: 'User successfully logged out',
                });
            }
        })
    } else {
        res.status(200).json({
            error: false,
            status: 'Ok',
            message: 'User already logout',
        });
    }
});


/**
 * Get all users
 */
router.get('/all-users', (req, res) => {
    UsersModel.find()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({
                message: 'Cannot get all users',
                status: 'Error',
                error: error
            })
        });
});

/**
 * @desc Create user
 */
router.post('/create', (req, res) => {
    let user = req.body;
    user.password = sha256(user.password);
    user = new UsersModel(user);
    user.save()
        .then(() => {
            res.status(200).json({
                error: false,
                status: 'Ok',
                message: 'User saved to database'
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({
                message: 'Cannot save user to database.' + JSON.stringify(error),
                status: 'Error',
                error: true
            });
        });
});


module.exports = router;
