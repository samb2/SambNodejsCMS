const express = require('express');
const router = express.Router();
const registerController = require('app/http/controllers/auth/RegisterController');
const registerValidator = require('app/validate/registerValidator');
// Middlewares
const redirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');

router.get('/', redirectIfAuthenticated.handle, registerController.showRegister);
router.post('/', redirectIfAuthenticated.handle, registerValidator.handle(), registerController.registerProcess);

module.exports = router;