const express = require('express');
const router = express.Router();
const {check, body} = require('express-validator');
const login = require('app/http/controllers/auth/LoginController');

router.get('/', login.showLogin);
router.post('/', [
    check('userName', 'Your username is required.').not().isEmpty(),
    check('password', 'Password is required.').not().isEmpty().bail()
        .isLength({min: 8}).withMessage('Password must be at least 8'),
], login.loginProcess);

module.exports = router;