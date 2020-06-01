const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').RecaptchaV3;
const isMongoId = require('validator/lib/isMongoId');

module.exports = class Controller {

    constructor() {
        autoBind(this);
        //this.recaptchaConfig();
    }

    recaptchaConfig() {
        this.recaptcha = new Recaptcha(
            config.service.recaptcha.client_key,
            config.service.recaptcha.secret_key,
            {
                callback: function (token) {
                    document.getElementById('g-recaptcha-response').value = token;
                }
            });
    }

    recaptchaVerify(req, res) {

        return new Promise((resolve, reject) => {
            this.recaptcha.verify(req, (error, data) => {
                if (error == null) {
                    resolve(true);
                } else {
                    console.log(error);
                    req.flash('captchaError', 'google recaptcha error');
                    this.back(req, res)
                }
            });
        });
    }

    back(req, res) {
        return res.redirect(req.header('Referer') || '/');
    }

    isMongoId(paramId) {
        if(! isMongoId(paramId))
            this.error('ای دی وارد شده صحیح نیست', 404);
    }

    error(message , status = 500) {
        let err = new Error(message);
        err.status = status;
        throw err;
    }

};