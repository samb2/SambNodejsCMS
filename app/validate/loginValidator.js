const {validationResult} = require('express-validator');
const {check, body} = require('express-validator');

let messages = {
    'userName': {value: '', error: ''},
    'password': {value: '', error: ''},
};

class LoginValidator {

    handle() {
        return [
            check('userName', 'Your username is required.').not().isEmpty(),
            check('password', 'Password is required.').not().isEmpty().bail()
        ]
    }

    validate(req) {
        this.validateValueMessage(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors.errors.forEach(result => {

                if (result.param === 'userName') {
                    messages.userName.error = result.msg;

                } else if (result.param === 'password') {
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
            'userName': {value: '', error: message},
            'password': {value: '', error: message},
        };
    }

    validateValueMessage(req) {
        messages = {
            'userName': {value: req.body.userName},
            'password': {value: req.body.password},
        };
    }
}

module.exports = new LoginValidator();