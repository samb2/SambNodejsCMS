const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');


module.exports = class Application {

    constructor() {
        this.setupExpress();
        this.setConfig();
    }

    setupExpress() {
        const server = http.createServer(app);
        server.listen(3000, () => console.log('listening on port 3000'));
    }

    setConfig() {

        //Define Static path
        app.use(express.static('public'));
        //Set view Engine
        app.set('view engine', 'ejs');
        //Set view Route in project
        app.set('views', path.resolve('./resource/views'));
        //body-parser used for access to req.body
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.get('/', (req, res) => {
            res.json('Hello World');
        });
    }
};