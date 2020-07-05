const controller = require('app/http/controllers/Controller');
const User = require('app/models/user');
const Course = require('app/models/course');
const Comment = require('app/models/comment');

class HomeController extends controller {

    async index(req, res) {

        //let user = await Course.findById('5ed57b6337e39382d4892cba').populate('episodes user').exec();
        //console.log(user.user.email);
        res.render('index');
        //return res.json(user);
    }

    async comment(req, res, next) {
        try {

            let newComment = new Comment({
                user: req.user.id,
                ...req.body
            });

            await newComment.save();

            return this.back(req, res);
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new HomeController();