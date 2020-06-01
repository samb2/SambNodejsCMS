const database = require('./database');
const session = require('./session');
const layout = require('./layout');
const service = require('./service');
module.exports = {
    database,
    port: process.env.PORT,
    session,
    layout,
    service,
    debug: true
};