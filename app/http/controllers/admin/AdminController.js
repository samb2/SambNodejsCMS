const controller = require('app/http/controllers/Controller');

class AdminController extends controller {

    index(req, res) {
        res.render('admin/index');
    }
}

module.exports = new AdminController();