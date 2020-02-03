const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').RecaptchaV3;

module.exports = class Controller {

    constructor() {
        autoBind(this);
        this.recaptchaConfig();

    }

    recaptchaConfig() {
        this.recaptcha = new Recaptcha(
            '6Le3-9MUAAAAANqdAU17btPHHuDU_3gkcSuVbGD-',
            '6Le3-9MUAAAAADGpNtyiGi9ooDM9xOZx5SwK5Idk',
            {
                callback: function (token) {
                    document.getElementById('g-recaptcha-response').value = token;
                }
            });
    }

    recaptchaVerify(req, res) {

        return new Promise((resolve, reject) => {

            this.recaptcha.verify(req, function (error, data) {
                if (error == null) {
                    resolve(true);
                } else {
                    //res.redirect('/register');
                    res.redirect(req.url);
                }
            });
        });
    }
};