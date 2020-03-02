const {validationResult} = require('express-validator');

let messages = {
    'firstName': {value: '', error: ''},
    'lastName': {value: '', error: ''},
    'userName': {value: '', error: ''},
    'email': {value: '', error: ''},
    'password': {value: '', error: ''},
    'confirmPassword': {value: '', error: ''},
};

class RegisterValidator {

    validate(req, message) {
        this.validateValueMessage(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
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
            message(messages);
            return true;

        } else {
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