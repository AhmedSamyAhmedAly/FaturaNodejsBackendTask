const express = require('express');
var cors = require('cors')
const cookieParser = require("cookie-parser");
require('dotenv').config();
const userRouter = require('./Routes/User')
const LogMiddleware = require("./middlewares/logger");
const ValidateAPIKeyMiddleware = require("./middlewares/apiKeyAuth");
const ErrorHandleMiddleware = require("./middlewares/errorhandling");
const sessionInit = require("./helper/sessionInitialize");


require('./db_connection/mongodb');
const app = express();

// let redisClient = redis.createClient({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//     password: process.env.REDIS_PASS,
//     no_ready_check: true,
//     // url: process.env.REDIS_URL,
// });
// //// redis error logs
// redisClient.on('error', err => {
//     console.log('Error ' + err);
// });

// initialize express-session to allow us track the logged-in user across sessions.
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized:true,
//     cookie: { maxAge: oneDay },
//     store: new RedisStore({ client: redisClient, ttl: 86400 }),
//     resave: false
// }))


app.use(cors())
app.use(express.json());
app.use(cookieParser());

///use Log and apiKeys middleware
app.use(LogMiddleware)
app.use(ErrorHandleMiddleware)
app.use(ValidateAPIKeyMiddleware)
app.use(sessionInit)

////Routes
app.use( '/api/users',userRouter);


app.listen(process.env.PORT || 3000, () => {
    console.info(`server listening on port 3000`);
}); 