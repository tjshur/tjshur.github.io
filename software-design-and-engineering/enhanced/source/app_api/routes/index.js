const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Method to authenticate JWT
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (authHeader == null) {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }

    const headers = authHeader.split(' ');

    if (headers.length < 2) {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(401);
    }

    const token = headers[1];

    if (token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if (err) {
            console.log('Token Validation Error!');
            return res.sendStatus(401);
        }

        req.auth = verified;
        next();
    });
}

// Method to authorize users based on role
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.auth || !req.auth.role) {
            console.log('User role not present in authenticated token.');
            return res.status(403).json({
                message: 'Forbidden: user role is not authorized for this operation'
            });
        }

        if (!allowedRoles.includes(req.auth.role)) {
            console.log(
                `Access denied for role '${req.auth.role}'. Allowed roles: ${allowedRoles.join(', ')}`
            );

            return res.status(403).json({
                message: 'Forbidden: insufficient permissions'
            });
        }

        next();
    };
}

// Define route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(
        authenticateJWT,
        authorizeRoles('admin', 'editor'),
        tripsController.tripsAddTrip
    );

// Define route for single trip endpoint
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(
        authenticateJWT,
        authorizeRoles('admin', 'editor'),
        tripsController.tripsUpdateTrip
    )
    .delete(
        authenticateJWT,
        authorizeRoles('admin'),
        tripsController.tripsDeleteTrip
    );

// Define route for registration endpoint
router
    .route('/register')
    .post(authController.register);

// Define route for login endpoint
router
    .route('/login')
    .post(authController.login);

module.exports = router;