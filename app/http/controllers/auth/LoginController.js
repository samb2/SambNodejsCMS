const controller = require('app/http/controllers/Controller');
const validator = require('app/validate/loginValidator');
const passport = require('passport');

class LoginController extends controller {

    showLogin(req, res) {
        res.render('loginPage', {errors : req.flash('errors'), captcha: this.recaptcha.render()});
    }

    loginProcess(req, res, next) {
        if (validator.validate(req, message => {
            messages = message;
            console.log(messages);
        })) {
            res.render('loginPage', {errors : req.flash('errors'), captcha: this.recaptcha.render()});
        } else {

            this.recaptchaVerify(req, res)
                .then(result => {
                    if (result) {
                        this.login(req, res, next);
                    } else {
                        console.log('recaptcha error');
                        res.redirect('/login');
                    }
                })

        }
    }

    login(req, res, next) {
        passport.authenticate('local.login', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    }

}

let messages = {
    'userName': {value: '', error: ''},
    'password': {value: '', error: ''},
};

module.exports = new LoginController();