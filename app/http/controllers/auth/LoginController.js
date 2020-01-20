const controller = require('app/http/controllers/Controller');

class LoginController {

    login(req, res) {
        res.render('login');
    }
}

module.exports = new LoginController();