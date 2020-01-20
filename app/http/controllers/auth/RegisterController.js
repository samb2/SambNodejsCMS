const controller = require('app/http/controllers/Controller');

class RegisterController {

    register(req, res) {
        res.render('register');
    }
}

module.exports = new RegisterController();