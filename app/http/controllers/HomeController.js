const controller = require('app/http/controllers/Controller');
const User = require('app/models/user');
const Course = require('app/models/course');

class HomeController extends controller {

    async index(req, res) {

        //let user = await Course.findById('5ed57b6337e39382d4892cba').populate('episodes user').exec();
        //console.log(user.user.email);
        res.render('index');
        //return res.json(user);
    }

}

module.exports = new HomeController();