const controller = require('app/http/controllers/Controller');
const validator = require('app/validate/admin/createCourseValidator');
const Course = require('app/models/course');
const fs = require('fs');

class courseController extends controller {

    index(req, res) {
        res.render('admin/courses');
    }

    create(req, res) {
        validator.validateErrorMessage('');
        res.render('admin/courses/create');
    }

    async createProcess(req, res, next) {
        validator.validateErrorMessage('');
        // check validation
        let validate = await validator.validate(req);
        if (validate) { //validation have Error
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                });
            }
            res.render('admin/courses/create');
        } else { //validation is OK
            this.store(req, res, next);
        }
    }

    async store(req, res, next) {
        let images = req.body.images;
        let {title, body, type, price, tags} = req.body;

        let newCourse = new Course({
            user: req.user._id,
            title,
            slug: this.slug(title),
            body,
            type,
            price,
            images,
            tags
        });

        await newCourse.save();

        return res.redirect('/admin/courses');
    }

    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-");
    }
}

module.exports = new courseController();