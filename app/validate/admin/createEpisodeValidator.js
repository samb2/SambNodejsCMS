const {validationResult} = require('express-validator');
const {check, body} = require('express-validator');
const Course = require('app/models/course');
const Episode = require('app/models/episode');
const validatorTest = require('../validatorTest');

class createEpisodeValidator extends validatorTest {

    handle() {
        return [
            check('title', 'Title is required.').not().isEmpty().bail(),
            check('time', 'time is required.').not().isEmpty().bail(),
            check('videoUrl', 'videoUrl is required.').not().isEmpty().bail(),
            check('body', 'body is required.').not().isEmpty().bail(),
            check('type', 'type is required.').not().isEmpty().bail(),
            check('number', 'number is required.').not().isEmpty().bail(),
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
                    messages.createEpisode.title.error = result.msg;

                } else if (result.param === 'type') {
                    messages.createEpisode.type.error = result.msg;
                } else if (result.param === 'body') {
                    messages.createEpisode.body.error = result.msg;
                } else if (result.param === 'time') {
                    messages.createEpisode.time.error = result.msg;
                } else if (result.param === 'videoUrl') {
                    messages.createEpisode.videoUrl.error = result.msg;
                } else if (result.param === 'course') {
                    messages.createEpisode.course.error = result.msg;
                } else if (result.param === 'number') {
                    messages.createEpisode.number.error = result.msg;
                }
            });
            return true;

        } else {
            return false;
        }
    }

    validateErrorMessage(message) {
        messages.createEpisode.title.value = '';
        messages.createEpisode.title.error = message;
        messages.createEpisode.type.value = '';
        messages.createEpisode.type.error = message;
        messages.createEpisode.body.value = '';
        messages.createEpisode.body.error = message;
        messages.createEpisode.time.value = '';
        messages.createEpisode.time.error = message;
        messages.createEpisode.videoUrl.value = '';
        messages.createEpisode.videoUrl.error = message;
        messages.createEpisode.course.error = message;
        messages.createEpisode.course.value = '';
        messages.createEpisode.number.error = message;
        messages.createEpisode.number.value = '';
    }

    validateValueMessage(req) {

        messages.createEpisode.title.value = req.body.title;
        messages.createEpisode.type.value = req.body.type;
        messages.createEpisode.body.value = req.body.body;
        messages.createEpisode.time.value = req.body.time;
        messages.createEpisode.videoUrl.value = req.body.videoUrl;
        messages.createEpisode.course.value = req.body.course;
        messages.createEpisode.number.value = req.body.number;
    }

}

module.exports = new createEpisodeValidator();