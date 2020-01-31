const controller = require('app/http/controllers/Controller');

const validator = require('app/validate/validator');

let messages = {
    'firstName': {value: '', error: ''},
    'lastName': {value: '', error: ''},
    'userName': {value: '', error: ''},
    'email': {value: '', error: ''},
    'password': {value: '', error: ''},
    'confirmPassword': {value: '', error: ''},
};


class RegisterController extends controller {

    //GET register process
    showRegister(req, res) {
        res.render('register', {messages, captcha: this.recaptcha.render()});
        messages = validator.validateErrorMessage('');
    }

    //POST register proccess
    registerProcess(req, res) {

        if (validator.validate(req, message => {
            messages = message;
        })) {
            res.render('register', {messages, captcha: this.recaptcha.render()});
        } else {
            this.recaptcha.verify(req, function (error, data) {
                if (error == null) {
                    res.json('register done!');
                } else {
                    res.redirect('/register');
                }
            });
        }
    }
}

module.exports = new RegisterController();