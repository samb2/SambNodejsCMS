const {validationResult} = require('express-validator');

let messages = {
    'userName': {value: '', error: ''},
    'password': {value: '', error: ''},
};

class LoginValidator {

    validate(req, message) {
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
            message(messages);
            return true;

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