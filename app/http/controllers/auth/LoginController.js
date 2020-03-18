const controller = require('app/http/controllers/Controller');
const validator = require('app/validate/loginValidator');
const passport = require('passport');

class LoginController extends controller {

    showLogin(req, res) {
        res.render('loginPage', {errors: req.flash('errors'), captcha: this.recaptcha.render()});
    }

    loginProcess(req, res, next) {
        if (validator.validate(req, message => {
            messages = message;
        })) {
            res.render('loginPage', {errors: req.flash('errors'), captcha: this.recaptcha.render()});
        } else {

            this.recaptchaVerify(req, res)
                .then(result => {
                    if (result) {
                        this.login(req, res, next);
                    } else {
                        res.redirect('/login');
                    }
                })

        }
    }

    login(req, res, next) {
        passport.authenticate('local.login', (err, user) => {
            if (!user) {
                console.log('not exist');
                return res.redirect('/login');
            }

            req.logIn(user, err => {
                if (req.body.remember) {
                    user.setRememberToken(res);
                }
                return res.redirect('/');
            });
        })(req, res, next);
    }

}

let messages = {
    'userName': {value: '', error: ''},
    'password': {value: '', error: ''},
};

module.exports = new LoginController();