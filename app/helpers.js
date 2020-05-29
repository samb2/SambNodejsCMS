const path = require('path');
const autoBind = require('auto-bind');

module.exports = class Helpers {

    constructor(req, res) {
        autoBind(this);
        this.req = req;
        this.res = res;
    }

    getObjects() {
        return {
            auth: this.auth(),
            viewPath: this.viewPath,
            checkLoginValid: this.checkLoginValid,
            checkRegisterValid: this.checkRegisterValid,
        }
    }

    viewPath(dir) {
        return path.resolve(config.layout.view_dir + '/' + dir);
    }

    auth() {
        return {
            check: this.req.isAuthenticated(),
            user: this.req.user
        }
    }

    checkLoginValid(message) {
        if (message.error !== '') {
            return 'is-invalid';
        } else if (message.value !== '') {
            return '';
        }

    }

    checkRegisterValid(message) {

        if (message.error !== '') {
            return 'is-invalid';
        }
        if (message.error === '' && message.value !== '') {
            return 'is-valid';
        }

    }

};