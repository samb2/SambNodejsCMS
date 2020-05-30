const express = require('express');
const router = express.Router();

const adminController = require('app/http/controllers/admin/AdminController');
const courseController = require('app/http/controllers/admin/courseController');
const createCourseValidator = require('app/validate/admin/createCourseValidator');

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

module.exports = router;