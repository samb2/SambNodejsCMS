const controller = require('app/http/controllers/Controller');
const {validationResult} = require('express-validator');

let messages = {
    'firstName': '',
    'lastName': '',
    'userName': '',
    'email': '',
    'password': '',
    'confirmPassword': '',
};

class RegisterController extends controller {

    showRegister(req, res) {
        res.render('register', {messages});
        this.validateMessage('');
    }

    registerProccess(req, res) {
        if (this.validator(req)) {
            res.redirect('/register');
        } else {
            res.json('register done!');
        }
    }

    validator(req) {
        this.validateMessage('ok');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.errors.forEach(result => {
                //messages.firstname(result.msg);
                if (result.param === 'firstName') {
                    messages.firstName = result.msg;

                } else if (result.param === 'lastName') {
                    messages.lastName = result.msg;

                } else if (result.param === 'userName') {
                    messages.userName = result.msg;

                } else if (result.param === 'email') {
                    messages.email = result.msg;

                } else if (result.param === 'password') {
                    messages.password = result.msg;

                } else if (result.param === 'confirmPassword') {
                    if (messages.password !== 'ok') {
                        messages.confirmPassword = result.msg;
                    } else {
                        messages.confirmPassword = result.msg;
                        messages.password = 'reEnter password';
                    }

                }
            });

            return true;

        } else {
            return false;
        }
    }

    validateMessage(message) {
        messages = {
            'firstName': message,
            'lastName': message,
            'userName': message,
            'email': message,
            'password': message,
            'confirmPassword': message,
        };
    }

}

module.exports = new RegisterController();