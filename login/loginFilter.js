var redis = require("redis");
var confUtil = require("../common/conf/confUtil");
var redisUtil = require("../common/redis/redisUtil");

function checkLogin(req, res, next){
    var cookies = req.cookies;
    console.log(JSON.stringify(cookies));
    var reqPath = req.path;
    var loginUrl = confUtil.getLoginUrl();
    for(var i = 0; i < loginUrl.length; i ++){
        if(loginUrl[i] == reqPath){
            return next();
        }
    }
    var sessionId = cookies.sessionId;
    if(sessionId){
        console.log("当前登录sessionId:" + sessionId);
        redisUtil.get(sessionId, function(err, data){
            if(err){
                console.log(err);
                return next(err);
            }
            if(data){
                console.log(data);
                return next();
            }
            return next(new Error("用户登录信息已失效，请重新登录！"));
        });
        return;
    }
    return next(new Error("用户未登录！"));
}

module.exports = checkLogin;