const controller = require('app/http/controllers/Controller');
const validator = require('app/validate/loginValidator');
const passport = require('passport');

class LoginController extends controller {

    showLogin(req, res) {

        messages = validator.validateErrorMessage('');
        if (req.flash('error')[0] === 'error') {
            messages.userName.value = 'user name or password is incorrect';
            messages.password.value = 'user name or password is incorrect';
        }

        res.render('auth/loginPage', {messages, captchaError: req.flash('captchaError'), captcha: this.recaptcha.render()});
    }

    async loginProcess(req, res, next) {

        // verify recaptcha
        await this.recaptchaVerify(req, res);

        // check validation
        let validate = await validator.validate(req);
        if (validate !== false) { //validation have Error
            messages = validate;
            res.render('auth/loginPage', {
                messages,
                captchaError: req.flash('captchaError'),
                captcha: this.recaptcha.render()
            });
        } else { //validation is OK
            this.login(req, res, next);
        }

    }

    login(req, res, next) {
        passport.authenticate('local.login', (err, user) => {
            if (!user) {
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