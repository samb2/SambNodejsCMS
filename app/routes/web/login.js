const express = require('express');
const router = express.Router();
const {check, body} = require('express-validator');
const login = require('app/http/controllers/auth/LoginController');
// Middlewares
const redirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');

router.get('/', redirectIfAuthenticated.handle, login.showLogin);
router.post('/', [
    check('userName', 'Your username is required.').not().isEmpty(),
    check('password', 'Password is required.').not().isEmpty().bail()
        .isLength({min: 8}).withMessage('Password must be at least 8'),
], redirectIfAuthenticated.handle, login.loginProcess);

module.exports = router;