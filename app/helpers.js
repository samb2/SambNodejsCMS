module.exports = class Helpers {

    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    getObjects() {
        return {
            auth: this.auth(),
            checkLoginValid: this.checkLoginValid,
            checkRegisterValid: this.checkRegisterValid,
        }
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

    checkRegisterValid(message){

        if (message.error !== ''){
            return 'is-invalid';
        }
        if (message.error === '' && message.value !== ''){
            return 'is-valid';
        }

    }

};