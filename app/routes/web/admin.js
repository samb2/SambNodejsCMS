const express = require('express');
const router = express.Router();

const adminController = require('app/http/controllers/admin/AdminController');
const courseController = require('app/http/controllers/admin/CourseController');
const createCourseValidator = require('app/validate/admin/createCourseValidator');
const episodeController = require('app/http/controllers/admin/episodeController');
const createEpisodeValidator = require('app/validate/admin/createEpisodeValidator');

// Helpers
const upload = require('app/helpers/uploadImage');

// Middlewares
const convertFileToField = require('app/http/middleware/convertFileToField');

router.use((req, res, next) => {

    res.locals.layout = 'admin/master';
    next();
});

router.get('/', adminController.index);
router.get('/courses', courseController.index);
router.get('/courses/create', courseController.create);
router.post('/courses/create', upload.single('images'), convertFileToField.handle, createCourseValidator.handle(), courseController.createProcess);
router.delete('/courses/:id', courseController.destroy);


router.get('/courses/:id/edit', courseController.edit);
router.put('/courses/:id',
    upload.single('images'),
    convertFileToField.handle,
    createCourseValidator.handle(),
    courseController.update
);

// Episode Routes
router.get('/episodes', episodeController.index);
router.get('/episodes/create', episodeController.create);
router.post('/episodes/create', createEpisodeValidator.handle(), episodeController.store);
router.get('/episodes/:id/edit', episodeController.edit);
router.put('/episodes/:id', createEpisodeValidator.handle(), episodeController.update);
router.delete('/episodes/:id', episodeController.destroy);


module.exports = router;