const redis = require('redis');


 // connect to redis cloud
let redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
    no_ready_check: true,
});
//// redis error logs
redisClient.on('error', err => {
    console.log('Error ' + err);
});

module.exports = redisClient