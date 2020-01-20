const controller = require('app/http/controllers/Controller');

class LoginController {

    login(req, res) {
        res.render('loginPage');
    }
}

module.exports = new LoginController();