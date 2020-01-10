const express = require('express');
const router = express.Router();

const adminController = require('app/http/controllers/admin/AdminController');

router.get('/' , adminController.index);
router.get('/courses' , adminController.courses);

module.exports = router;