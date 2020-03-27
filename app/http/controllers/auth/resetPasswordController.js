const controller = require('app/http/controllers/Controller');
const validator = require('app/validate/resetPasswordValidator');
const PasswordReset = require('app/models/password-reset');
const User = require('app/models/user');
const uniqueString = require('unique-string');

class resetPasswordController extends controller {

    showResetPassword(req, res) {
        res.render('auth/password/reset', {
            messages,
            captchaError: req.flash('captchaError'),
            captcha: this.recaptcha.render(),
            token: req.params.token
        });
    }

    async resetPasswordProcess(req, res, next) {
        // verify recaptcha
        await this.recaptchaVerify(req, res);

        // check validation
        let validate = await validator.validate(req);

        if (validate !== false) { //validation have Error
            messages = validate;

            res.redirect('/password/reset/' + req.body.token);
        } else { //validation is OK

            this.resetPassword(req, res, next);
        }
    };

    async resetPassword(req, res, next) {
        let field = await PasswordReset.findOne({token: req.body.token});
        if (!field) {
            //req.flash('errors', 'اطلاعات وارد شده صحیح نیست لطفا دقت کنید');
            messages.password.error = 'اطلاعات وارد شده صحیح نیست لطفا دقت کنید';
            return this.back(req, res);
        }

        if (field.use) {
            //req.flash('errors', 'از این لینک برای بازیابی پسورد قبلا استفاده شده است');
            messages.password.error = 'از این لینک برای بازیابی پسورد قبلا استفاده شده است';
            return this.back(req, res);
        }

        let user = await User.findOneAndUpdate({email: field.email}, {$set: {password: req.body.password}});
        if (!user) {
            req.flas('errors', 'اپدیت شدن انجام نشد');
            messages.password.error = 'اپدیت شدن انجام نشد';
            return this.back();
        }

        await field.update({use: true});
        return res.redirect('/login');


    }
}

let messages = {
    'password': {value: '', error: ''}
};

module.exports = new resetPasswordController();