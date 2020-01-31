const express = require('express');
const router = express.Router();
const {check, body} = require('express-validator');
const registerController = require('app/http/controllers/auth/RegisterController');
router.get('/', registerController.showRegister);
router.post('/', [
    check('firstName', 'First name is required.').not().isEmpty().bail()
        .not().isNumeric().withMessage('Valid first name is required.'),
    check('lastName', 'Last name is required.').not().isEmpty().bail()
        .not().isNumeric().withMessage('Valid last name is required.'),
    check('userName', 'Your username is required.').not().isEmpty(),
    check('email', 'Email is required.').not().isEmpty().bail()
        .isEmail().normalizeEmail().withMessage('Please enter a valid email address for shipping updates.'),
    check('password', 'Password is required.').not().isEmpty().bail()
        .isLength({min: 8}).withMessage('Password must be at least 8').bail()
        .matches(/\d/).withMessage('Password must contain a number').bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/).withMessage('Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'),
    check('confirmPassword', 'Confirm Password is required.').not().isEmpty(),
    body('confirmPassword').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    })
], registerController.registerProcess);

module.exports = router;