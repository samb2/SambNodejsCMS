const controller = require('app/http/controllers/Controller');
const validator = require('app/validate/forgotPasswordValidator');
const PasswordReset = require('app/models/password-reset');
const User = require('app/models/user');
const uniqueString = require('unique-string');

class forgotPasswordController extends controller {

    showForgotPassword(req, res) {
        res.render('auth/password/email', {
            messages,
            captchaError: req.flash('captchaError'),
            captcha: this.recaptcha.render()
        });
    }

    async sendPasswordResetLink(req, res, next) {
        // verify recaptcha
        await this.recaptchaVerify(req, res);

        // check validation
        let validate = await validator.validate(req);

        if (validate !== false) { //validation have Error
            messages = validate;
            res.render('auth/password/email', {
                messages,
                captchaError: req.flash('captchaError'),
                captcha: this.recaptcha.render()
            });
        } else { //validation is OK

            this.sendResetLink(req, res, next);
        }
    };

    async sendResetLink(req, res, next) {
        let user = await User.findOne({email: req.body.email});
        if (!user) {
            messages.email.error = 'چنین کاربری وجود ندارد';
            res.redirect('/password/email');
        } else {
            const newPasswordReset = new PasswordReset({
                email: req.body.email,
                token: uniqueString()
            });
            await newPasswordReset.save();
            // send Mail

            res.redirect('/');
            // req.flash('success' , 'ایمیل بازیابی رمز عبور با موفقیت انجام شد');
        }


    }
}

let messages = {
    'email': {value: '', error: ''}
};

module.exports = new forgotPasswordController();