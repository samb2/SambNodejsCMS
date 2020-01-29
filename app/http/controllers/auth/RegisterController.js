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
                    if (messages.firstName === '' || messages.firstName === 'ok') {
                        messages.firstName = result.msg;
                    }

                } else if (result.param === 'lastName') {
                    if (messages.lastName === '' || messages.lastName === 'ok') {
                        messages.lastName = result.msg;
                    }

                } else if (result.param === 'userName') {
                    if (messages.userName === '' || messages.userName === 'ok') {
                        messages.userName = result.msg;
                    }

                } else if (result.param === 'email') {
                    if (messages.email === '' || messages.email === 'ok') {
                        messages.email = result.msg;
                    }

                } else if (result.param === 'password') {
                    if (messages.password === '' || messages.password === 'ok') {
                        messages.password = result.msg;
                    }

                } else if (result.param === 'confirmPassword') {
                    if (messages.confirmPassword === '' || messages.confirmPassword === 'ok') {
                        messages.confirmPassword = result.msg;
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