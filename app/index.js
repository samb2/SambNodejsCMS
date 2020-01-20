const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
//const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');


module.exports = class Application {

    constructor() {
        this.setupExpress();
        this.setupMongoDB().then(() => console.log("connecting to MongoDB Successfully!!!"));
        this.setConfig();
        this.setRouters();
    }

    setupExpress() {
        const server = http.createServer(app);
        server.listen(3000, () => console.log('listening on port 3000'));
    }

    async setupMongoDB() {
        await mongoose.connect('mongodb://localhost/sambnodejscms', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    setConfig() {

        //Define Static path
        app.use(express.static('public'));
        //Set view Engine
        app.set('view engine', 'pug');
        //Set view Route in project
        app.set('views', path.resolve('./resource/views'));
        //body-parser used for access to req.body
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        //Set session middleware
        app.use(session({
            secret: 'mysecretkey',
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));
        //Set cookie-parser
        app.use(cookieParser('mysecretkey'));
        //Set flash Message
        app.use(flash());

    }

    setRouters() {
        app.use(require('app/routes/api'));
        app.use(require('app/routes/web'));
    }
};