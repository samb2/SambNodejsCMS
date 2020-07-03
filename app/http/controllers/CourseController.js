const controller = require('app/http/controllers/Controller');
const User = require('app/models/user');
const Course = require('app/models/course');

class CourseController extends controller {

    async index(req, res) {
        res.render('courses');
    }

    async single(req, res) {

        let course = await Course.findOne({slug: req.params.course}).populate('user episodes').exec();
        let canUserUse = await this.canUse(req, course);
        res.render('single-course', {course, canUserUse});
        //return res.json(course);
        //console.log(course);

    }

    async canUse(req, course) {
        let canUse = false;
        if (req.isAuthenticated()) {
            switch (course.type) {
                case 'vip':
                    canUse = req.user.isVip();
                    break;
                case 'cash':
                    canUse = req.user.checkLearning(course);
                    break;
                default:
                    canUse = true;
                    break;
            }
        }
        return canUse;
    }

}

module.exports = new CourseController();