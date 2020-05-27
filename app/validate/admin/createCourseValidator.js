const {validationResult} = require('express-validator');
const {check, body} = require('express-validator');
const Course = require('app/models/course');
const validator = require('../validator');

class createCourseValidator extends validator {

    handle() {
        return [
            check('title', 'Title is required.').not().isEmpty()
                .custom(async (value) => {
                    let course = await Course.findOne({slug: this.slug(value)});
                    if (course) {
                        throw new Error('چنین دوره ای با این عنوان قبلا در سایت قرار داد شده است')
                    }
                }),
            check('type', 'Password is required.').not().isEmpty().bail(),
            check('body', 'body is required.').not().isEmpty().bail(),
            //check('image', 'image is required.').not().isEmpty().bail(),
            check('price', 'price is required.').not().isEmpty().bail(),
            check('tags', 'tag is required.').not().isEmpty().bail(),
        ]
    }

    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
    }

    validate(req) {
        this.validateValueMessage(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors.errors.forEach(result => {

                if (result.param === 'title') {
                    messages.createCourse.title.error = result.msg;

                } else if (result.param === 'type') {
                    messages.createCourse.type.error = result.msg;
                } else if (result.param === 'body') {
                    messages.createCourse.body.error = result.msg;
                } else if (result.param === 'image') {
                    messages.createCourse.image.error = result.msg;
                } else if (result.param === 'price') {
                    messages.createCourse.price.error = result.msg;
                } else if (result.param === 'tags') {
                    messages.createCourse.tags.error = result.msg;
                }
            });
            return true;

        } else {
            return false;
        }
    }

    validateErrorMessage(message) {
        messages.createCourse.title.value = '';
        messages.createCourse.title.error = message;
        messages.createCourse.type.value = '';
        messages.createCourse.type.error = message;
        messages.createCourse.body.value = '';
        messages.createCourse.body.error = message;
        messages.createCourse.image.value = '';
        messages.createCourse.image.error = message;
        messages.createCourse.price.value = '';
        messages.createCourse.price.error = message;
        messages.createCourse.tags.value = '';
        messages.createCourse.tags.error = message;
    }

    validateValueMessage(req) {

        messages.createCourse.title.value = req.body.title;
        messages.createCourse.type.value = req.body.type;
        messages.createCourse.body.value = req.body.body;
        messages.createCourse.image.value = req.body.image;
        messages.createCourse.price.value = req.body.price;
        messages.createCourse.tags.value = req.body.tags;
    }

}

module.exports = new createCourseValidator();