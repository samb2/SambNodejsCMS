const express = require('express');
const router = express.Router();

const register = require('app/http/controllers/auth/RegisterController');
router.use('/', register.register);

module.exports = router;