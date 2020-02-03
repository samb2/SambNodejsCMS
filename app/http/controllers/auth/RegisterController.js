const controller = require('app/http/controllers/Controller');
const validator = require('app/validate/validator');
const passport = require('passport');

class RegisterController extends controller {

    //GET register process
    showRegister(req, res) {

        messages = validator.validateErrorMessage('');
        if (req.flash('errors')[0] === 'چنین کاربری قبلا در سایت ثبت نام کرده است') {
            messages.userName.error = 'Username Already taken';
        }
        res.render('register', {messages, captcha: this.recaptcha.render()});
    }

    //POST register process
    registerProcess(req, res, next) {

        if (validator.validate(req, message => {
            messages = message;
        })) {
            res.render('register', {messages, captcha: this.recaptcha.render()});
        } else {
            this.recaptchaVerify(req, res)
                .then(result => {
                    if (result) {
                        this.register(req, res, next);
                    } else {
                        res.redirect('/register');
                    }
                });
        }
    }

    register(req, res, next) {
        passport.authenticate('local.register', {
            successRedirect: '/',
            failureRedirect: '/register',
            failureFlash: true
        })(req, res, next);
    }
}

let messages = {
    'firstName': {value: '', error: ''},
    'lastName': {value: '', error: ''},
    'userName': {value: '', error: ''},
    'email': {value: '', error: ''},
    'password': {value: '', error: ''},
    'confirmPassword': {value: '', error: ''},
};

module.exports = new RegisterController();