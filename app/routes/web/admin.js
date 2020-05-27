const express = require('express');
const router = express.Router();

const adminController = require('app/http/controllers/admin/AdminController');
const courseController = require('app/http/controllers/admin/courseController');
const createCourseValidator = require('app/validate/admin/createCourseValidator');

router.use((req, res, next) => {

    res.locals.layout = 'admin/master';
    next();
});

router.get('/', adminController.index);
router.get('/courses', courseController.index);
router.get('/courses/create', courseController.create);
router.post('/courses/create', createCourseValidator.handle(), courseController.createProcess);

module.exports = router;