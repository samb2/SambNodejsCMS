const controller = require('app/http/controllers/Controller');

class AdminController {

    index(req, res) {
        res.render('admin/index');
    }

    courses(req, res) {
        res.json('course Page');
    }
}

module.exports = new AdminController();