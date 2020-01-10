const controller = require('app/http/controllers/Controller');

class AdminController extends controller {

    index(req , res){
        res.json('Admin Page!');
    }

    courses(req , res) {
        res.json('course Page');
    }
}

module.exports = new AdminController();