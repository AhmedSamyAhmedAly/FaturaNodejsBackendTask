const { createBlackList } = require('jwt-blacklist')

//// create blacklist for loged out to invalidate  tokens
const Blacklist = createBlackList({
  daySize: 10000, //  number of tokens need revoking each day
  errorRate: 0.001, // optional, error rate each day
  storeType: 'redis', // data store type
  redisOptions: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
  }
  
});

module.exports = Blacklist;
