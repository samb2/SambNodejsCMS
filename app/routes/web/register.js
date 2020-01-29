const express = require('express');
const router = express.Router();
const {check, body} = require('express-validator');

const registerController = require('app/http/controllers/auth/RegisterController');
router.get('/', registerController.showRegister);
router.post('/', [
    check('firstName', 'Valid first name is required.').not().isEmpty(),
    check('lastName', 'Valid last name is required.').not().isEmpty(),
    check('userName', 'Your username is required.').not().isEmpty(),
    check('email', 'Valid email name is required.').not().isEmpty(),
    check('email', 'Please enter a valid email address for shipping updates.').isEmail(),
    check('password', 'Please enter a valid password.').not().isEmpty(),
    body('confirmPassword').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    })
], registerController.registerProccess);

module.exports = router;