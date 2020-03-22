const {validationResult} = require('express-validator');
const {check, body} = require('express-validator');

let messages = {
    'firstName': {value: '', error: ''},
    'lastName': {value: '', error: ''},
    'userName': {value: '', error: ''},
    'email': {value: '', error: ''},
    'password': {value: '', error: ''},
    'confirmPassword': {value: '', error: ''},
};

class RegisterValidator {

    // check all input values and validate them
    handle() {
        return [
            check('firstName', 'First name is required.')
                .not().isEmpty().bail()
                .not().isNumeric()
                .withMessage('Valid first name is required.'),

            check('lastName', 'Last name is required.')
                .not().isEmpty().bail()
                .not().isNumeric()
                .withMessage('Valid last name is required.'),

            check('userName', 'Your username is required.')
                .not().isEmpty(),

            check('email', 'Email is required.')
                .not().isEmpty().bail()
                .isEmail()
                .withMessage('Please enter a valid email address for shipping updates.'),

            check('password', 'Password is required.').not().isEmpty().bail()
                .isLength({min: 8}).withMessage('Password must be at least 8').bail()
                .matches(/\d/).withMessage('Password must contain a number').bail()
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/)
                .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'),

            check('confirmPassword', 'Confirm Password is required.')
                .not().isEmpty(),

            body('confirmPassword').custom((value, {req}) => {
                if (value !== req.body.password) {
                    throw new Error('Password confirmation does not match password');
                }
                return true;
            })
        ];
    }

    async validate(req) {

        // save values from user input
        this.validateValueMessage(req);

        // get errors of validation
        const errors = validationResult(req);


        if (!errors.isEmpty()) { // if errors is not empty

            // fill error message
            errors.errors.forEach(result => {

                if (result.param === 'firstName') {
                    messages.firstName.error = result.msg;

                } else if (result.param === 'lastName') {
                    messages.lastName.error = result.msg;

                } else if (result.param === 'userName') {
                    messages.userName.error = result.msg;

                } else if (result.param === 'email') {
                    messages.email.error = result.msg;

                } else if (result.param === 'password') {
                    messages.password.error = result.msg;
                    messages.confirmPassword.value = '';

                } else if (result.param === 'confirmPassword') {
                    messages.confirmPassword.error = result.msg;
                    messages.password.value = '';
                }
            });
            return messages;
        } else {
            // return false when errors is empty
            return false;
        }
    }

    validateErrorMessage(message) {
        return messages = {
            'firstName': {value: '', error: message},
            'lastName': {value: '', error: message},
            'userName': {value: '', error: message},
            'email': {value: '', error: message},
            'password': {value: '', error: message},
            'confirmPassword': {value: '', error: message},
        };
    }

    validateValueMessage(req) {
        messages = {
            'firstName': {value: req.body.firstName},
            'lastName': {value: req.body.lastName},
            'userName': {value: req.body.userName},
            'email': {value: req.body.email},
            'password': {value: req.body.password},
            'confirmPassword': {value: req.body.confirmPassword},
        };
    }
}

module.exports = new RegisterValidator();