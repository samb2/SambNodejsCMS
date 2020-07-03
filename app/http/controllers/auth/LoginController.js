const controller = require('app/http/controllers/Controller');
const validator = require('app/validate/loginValidator');
const passport = require('passport');

class LoginController extends controller {

    showLogin(req, res) {
        validator.validateErrorMessage('');

        res.render('auth/loginPage', {
            captchaError: req.flash('captchaError'),
            captcha: this.recaptcha.render()
        });
    }

    async loginProcess(req, res, next) {
        validator.validateErrorMessage('');
        // verify recaptcha
        await this.recaptchaVerify(req, res);

        // check validation
        let validate = await validator.validate(req);
        if (validate) { //validation have Error
            res.render('auth/loginPage', {
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
                messages.login.error = 'username or Password is incorrect';
                return res.render('auth/loginPage', {
                    captchaError: req.flash('captchaError'),
                    captcha: this.recaptcha.render()
                });
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

module.exports = new LoginController();