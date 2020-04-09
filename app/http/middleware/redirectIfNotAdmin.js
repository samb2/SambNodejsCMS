const User = require('app/models/user');
const middleware = require('./middleware');

class RedirectIfNotAdmin extends middleware {

    handle(req, res, next) {

        if (req.user) {
            if (req.isAuthenticated && req.user.admin) {
                return next();
            }
        }

        res.redirect('/');
    }
}

module.exports = new RedirectIfNotAdmin();