const controller = require('app/http/controllers/Controller');

class LoginController extends controller {

    showLogin(req, res) {
        res.render('loginPage');
    }
}

module.exports = new LoginController();