const controller = require('app/http/controllers/Controller');

class HomeController extends controller {

    index(req, res) {
        res.render('index');
    }

    message() {
        return 'Home Page!'
    }

}

module.exports = new HomeController();