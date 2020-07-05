const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('app/http/controllers/HomeController');
const courseController = require('app/http/controllers/CourseController');
// Middleware
const redirectIfNotAuthenticated = require('app/http/middleware/redirectIfNotAuthenticated');

// Home Routes
router.get('/', homeController.index);

// Courses
router.get('/courses', courseController.index);
router.get('/courses/:course', courseController.single);

//Download
router.get('/download/:episode', courseController.download);

router.post('/comment', redirectIfNotAuthenticated.handle, homeController.comment);

module.exports = router;