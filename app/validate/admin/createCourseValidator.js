const {validationResult} = require('express-validator');
const {check, body} = require('express-validator');
const Course = require('app/models/course');
const validatorTest = require('../validatorTest');

class createCourseValidator extends validatorTest {

    handle() {
        return [
            check('title', 'Title is required.').not().isEmpty().bail()
                .custom(async (value, {req}) => {
                    if (req.query._method === 'put') {
                        let course = await Course.findById(req.params.id);
                        if (course.title === value) return;
                    }
                    let course = await Course.findOne({slug: this.slug(value)});
                    if (course) {
                        throw new Error('چنین دوره ای با این عنوان قبلا در سایت قرار داد شده است');
                    }
                }),
            check('type', 'Password is required.').not().isEmpty().bail(),
            check('body', 'body is required.').not().isEmpty().bail(),
            check('images').custom(async (value) => {
                if (!value) {
                    throw new Error('وارد کردن تصویر الزامیست');
                }
                // let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
                // if (!fileExt.includes(path.extname(value))) {
                //     throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست')
                // }
            }),
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
                } else if (result.param === 'images') {
                    messages.createCourse.images.error = result.msg;
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
        messages.createCourse.images.value = '';
        messages.createCourse.images.error = message;
        messages.createCourse.price.value = '';
        messages.createCourse.price.error = message;
        messages.createCourse.tags.value = '';
        messages.createCourse.tags.error = message;
    }

    validateValueMessage(req) {

        messages.createCourse.title.value = req.body.title;
        messages.createCourse.type.value = req.body.type;
        messages.createCourse.body.value = req.body.body;
        messages.createCourse.images.value = req.body.image;
        messages.createCourse.price.value = req.body.price;
        messages.createCourse.tags.value = req.body.tags;
    }

}

module.exports = new createCourseValidator();