const {validationResult} = require('express-validator');
const {check, body} = require('express-validator');

class resetPasswordValidator {
    handle() {
        return [
            check('password', 'Password is required.').not().isEmpty().bail()
                .isLength({min: 8}).withMessage('Password must be at least 8').bail()
                .matches(/\d/).withMessage('Password must contain a number').bail()
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/)
                .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'),
        ]
    }

    async validate(req) {

        // save values from user input
        this.validateValueMessage(req);

        // get errors of validation
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors.errors.forEach(result => {

                if (result.param === 'password') {
                    messages.password.error = result.msg;

                }
            });
            return messages;

        } else {
            return false;
        }
    }


    validateErrorMessage(message) {
        return messages = {
            'password': {value: '', error: message}
        };
    }

    validateValueMessage(req) {
        messages = {
            'password': {value: req.body.userName}
        };
    }
}

let messages = {
    'password': {value: '', error: ''},
};

module.exports = new resetPasswordValidator();