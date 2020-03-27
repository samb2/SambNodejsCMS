const controller = require('app/http/controllers/Controller');

class HomeController extends controller {

    index(req, res) {
        //res.render('index');
        res.json(req.user);
    }

    message() {
        return 'Home Page!'
    }
}

module.exports = new HomeController();