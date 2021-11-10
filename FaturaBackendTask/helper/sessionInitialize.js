const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('../db_connection/redisConn');

const oneDay = 1000 * 60 * 60 * 24;

// session creation
module.exports = session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    store: new RedisStore({ client: redisClient, ttl: 86400 }),
    resave: false
})