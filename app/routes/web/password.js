const express = require('express');
const router = express.Router();
const forgotPassController = require('app/http/controllers/auth/forgotPasswordController');
const forgotPasswordValidator = require('app/validate/forgotPasswordValidator');

const resetPasswordValidator = require('app/validate/resetPasswordValidator');
const resetPasswordController = require('app/http/controllers/auth/resetPasswordController');

router.get('/email',forgotPassController.showForgotPassword);
router.post('/email',forgotPasswordValidator.handle(),forgotPassController.sendPasswordResetLink);
//router.get('/reset',);

router.get('/reset/:token' , resetPasswordController.showResetPassword);
router.post('/reset' ,resetPasswordValidator.handle() ,resetPasswordController.resetPasswordProcess);

module.exports = router;