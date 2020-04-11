const {validationResult} = require('express-validator');
const {check, body} = require('express-validator');

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
                    messages.register.firstName.error = result.msg;

                } else if (result.param === 'lastName') {
                    messages.register.lastName.error = result.msg;

                } else if (result.param === 'userName') {
                    messages.register.userName.error = result.msg;

                } else if (result.param === 'email') {
                    messages.register.email.error = result.msg;

                } else if (result.param === 'password') {
                    messages.register.password.error = result.msg;
                    messages.register.confirmPassword.value = '';

                } else if (result.param === 'confirmPassword') {
                    messages.register.confirmPassword.error = result.msg;
                    messages.register.password.value = '';
                }
            });
            return true;
        } else {
            // return false when errors is empty
            return false;
        }
    }

    validateErrorMessage(message) {
        messages.register.firstName.error = message;
        messages.register.lastName.error = message;
        messages.register.userName.error = message;
        messages.register.email.error = message;
        messages.register.password.error = message;
        messages.register.confirmPassword.error = message;

        messages.register.firstName.value = '';
        messages.register.lastName.value = '';
        messages.register.userName.value = '';
        messages.register.email.value = '';
        messages.register.password.value = '';
        messages.register.confirmPassword.value = '';


    }

    validateValueMessage(req) {

        messages.register.firstName.value = req.body.firstName;
        messages.register.lastName.value = req.body.lastName;
        messages.register.userName.value = req.body.userName;
        messages.register.email.value = req.body.email;
        messages.register.password.value = req.body.password;
        messages.register.confirmPassword.value = req.body.confirmPassword;
    }
}

module.exports = new RegisterValidator();