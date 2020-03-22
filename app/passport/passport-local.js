const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('app/models/user');


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use('local.register', new localStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: true
}, (req, userName, password, done) => {
    User.findOne({'userName': userName}, (err, user) => {
        if (err) return done(err);
        if (user) return done(null, false, req.flash('errors', 'چنین کاربری قبلا در سایت ثبت نام کرده است'));

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password
        });

        newUser.save(err => {
            if (err) return done(err, false, req.flash('errors', 'ثبت نام با موفقیت انجام نشد لطفا دوباره سعی کنید'));
            done(null, newUser);
        });

    })
}));


passport.use('local.login' , new localStrategy({
    usernameField : 'userName',
    passwordField : 'password',
    passReqToCallback : true
} , (req , userName ,  password , done) => {
    User.findOne({ 'userName' : userName } , (err , user) => {
        if(err) return done(err);

        if(! user || ! user.comparePassword(password)) {
            return done(null , false , req.flash('errors' , 'اطلاعات وارد شده مطابقت ندارد'));
        }

        done(null , user);
    })
}));