const express = require('express');
const router = express.Router();

const login = require('app/http/controllers/auth/LoginController');
router.get('/', login.showLogin);

module.exports = router;