const {validationResult} = require('express-validator');
const {check, body} = require('express-validator');


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
                    messages.login.username.error = result.msg;

                } else if (result.param === 'password') {
                    messages.login.password.error = result.msg;
                }
            });
            return true;

        } else {
            return false;
        }
    }

    validateErrorMessage(message) {
        messages.login.username.value = '';
        messages.login.username.error = message;
        messages.login.password.value = '';
        messages.login.password.error = message;
        messages.login.error = '';
    }

    validateValueMessage(req) {
        messages.login.username.value = req.body.userName;
        messages.login.password.value = req.body.password;
    }

}

module.exports = new LoginValidator();