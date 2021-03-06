const controller = require('app/http/controllers/Controller');
const validator = require('app/validate/registerValidator');
const passport = require('passport');

class RegisterController extends controller {

    //GET register process
    showRegister(req, res) {

        //delete all validation errors
        validator.validateErrorMessage('');

        //check userName exist in DataBase
        if (req.flash('errors')[0] === 'userExist') {
            messages.register.userName.error = 'Username Already taken';
        }
        // Show register Form
        res.render('auth/register', {
            captchaError: req.flash('captchaError'),
            captcha: this.recaptcha.render()
        });
    }

    //POST register process
    async registerProcess(req, res, next) {

        validator.validateErrorMessage('');
        // verify recaptcha
        //await this.recaptchaVerify(req, res);

        // check validation
        let validate = await validator.validate(req);
        if (validate) { //validation have Error
            res.render('auth/register', {
                captchaError: req.flash('captchaError'),
                captcha: this.recaptcha.render()
            });
        } else { //validation is OK
            this.register(req, res, next);
        }
    }

    // registering user and save in DataBase
    register(req, res, next) {
        passport.authenticate('local.register', {
            successRedirect: '/',
            failureRedirect: 'auth/register',
            failureFlash: true
        })(req, res, next);
    }
}


module.exports = new RegisterController();