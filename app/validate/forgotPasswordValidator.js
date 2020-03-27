const {validationResult} = require('express-validator');
const {check, body} = require('express-validator');

class forgotPasswordValidator {
    handle() {
        return [
            check('email', 'Email is required.')
                .not().isEmpty().bail()
                .isEmail()
                .withMessage('Please enter a valid email address for shipping updates.'),
        ]
    }

    async validate(req) {

        // save values from user input
        this.validateValueMessage(req);

        // get errors of validation
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors.errors.forEach(result => {

                if (result.param === 'email') {
                    messages.email.error = result.msg;

                }
            });
            return messages;

        } else {
            return false;
        }
    }


    validateErrorMessage(message) {
        return messages = {
            'email': {value: '', error: message}
        };
    }

    validateValueMessage(req) {
        messages = {
            'email': {value: req.body.userName}
        };
    }
}

let messages = {
    'email': {value: '', error: ''},
};

module.exports = new forgotPasswordValidator();