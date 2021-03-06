const express = require('express');
const router = express.Router();

const login = require('app/http/controllers/auth/LoginController');
const passport = require('passport');


// Validator
const loginValidator = require('app/validate/loginValidator');

router.get('/', login.showLogin);
router.post('/', loginValidator.handle(), login.loginProcess);

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google', {successRedirect: '/', failureRedirect: '/register'}));

module.exports = router;