var redis = require("redis");
var confUtil = require("../conf/confUtil");

function createRedisClient(){
    var redisConfig = confUtil.getRedisConf();
    return redis.createClient(redisConfig.port, redisConfig.host);
}

var redisClient = createRedisClient();

module.exports = redisClient;