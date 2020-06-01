const express = require('express');
const router = express.Router();

const redirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');
const redirectIfnotAdmin = require('app/http/middleware/redirectIfNotAdmin');
const errorHandler = require('app/http/middleware/errorHandler');

// Home Router
const homeRouter = require('app/routes/web/home');
router.use('/', homeRouter);

// Admin Router
const adminRouter = require('app/routes/web/admin');
router.use('/admin', redirectIfnotAdmin.handle, adminRouter);

//About Router
const aboutRouter = require('app/routes/web/about');
router.use('/about', aboutRouter);

//Login
const loginRouter = require('app/routes/web/login');
router.use('/login', redirectIfAuthenticated.handle, loginRouter);

//Register
const registerRouter = require('app/routes/web/register');
router.use('/register', registerRouter);

//Password
const passwordRouter = require('app/routes/web/password');
router.use('/password', passwordRouter);

//Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.clearCookie('remember_token');
    res.redirect('/');
});

// Handle Errors
router.all('*', errorHandler.error404);
router.use(errorHandler.handler);


module.exports = router;