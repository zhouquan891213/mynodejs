var fs = require("fs");

function initSysConf(){
    var sysContect = fs.readFileSync("./common/conf/sys.conf", "utf8");
    return JSON.parse(sysContect);
}

var sysConf = initSysConf();

module.exports.getLoginUrl = function(){
    return sysConf.loginUrl;
}

module.exports.getActionMapping = function(name){
    return sysConf.actionMapping[name];
}

module.exports.getRedisConf = function(){
    return sysConf.redis;
}