const controller = require('app/http/controllers/Controller');

class AboutController extends controller {

    index(req, res) {
        res.render('about');
    }

}

module.exports = new AboutController();