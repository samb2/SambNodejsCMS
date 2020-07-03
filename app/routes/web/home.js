const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('app/http/controllers/HomeController');
const courseController = require('app/http/controllers/CourseController');


// Home Routes
router.get('/', homeController.index);

// Courses
router.get('/courses', courseController.index);
router.get('/courses/:course', courseController.single);

module.exports = router;