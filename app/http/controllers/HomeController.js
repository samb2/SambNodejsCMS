const controller = require('app/http/controllers/Controller');
class HomeController extends controller{

    index(req, res) {

        res.render('index');
        //res.json(req.user);
    }

}

module.exports = new HomeController();