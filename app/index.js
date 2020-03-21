const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const helpers = require('./helpers');
const rememberLogin = require('app/http/middleware/rememberLogin');
const expressLayouts = require('express-ejs-layouts');

module.exports = class Application {

    constructor() {
        this.setupExpress();
        this.setupMongoDB().then(() => console.log("connecting to MongoDB Successfully!!!"));
        this.setConfig();
        this.setRouters();
    }

    setupExpress() {
        const server = http.createServer(app);
        server.listen(config.port, () => console.log(`listening on port ${config.port}`));
    }

    async setupMongoDB() {
        await mongoose.connect(config.database.url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    }

    setConfig() {

        require('app/passport/passport-local');

        //Define Static path
        app.use(express.static(config.layout.public_dir));
        //Set view Engine
        app.set('view engine', config.layout.view_engine);
        //Set view Route in project
        app.set('views', config.layout.view_dir);
        app.use(expressLayouts);

        //body-parser used for access to req.body
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        //Set session middleware
        app.use(session({...config.session}));
        //Set cookie-parser
        app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
        //Set flash Message
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(rememberLogin.handle);
        app.use((req, res, next) => {
            app.locals = new helpers(req, res).getObjects();
            next();
        });


    }

    setRouters() {
        app.use(require('app/routes/api'));
        app.use(require('app/routes/web'));
    }
};