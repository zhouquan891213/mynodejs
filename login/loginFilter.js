var confUtil = require("../common/conf/confUtil");
var redisUtil = require("../common/redis/redisUtil");

function checkLogin(req, res, next){
    res.setHeader("Content-Type", confUtil.getContentType());
    var cookies = req.cookies;
    console.log("当前cookies信息:" + JSON.stringify(cookies));
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
                console.log("从redis服务器获取登录用户信息:" + data);
                req.userInfo = JSON.parse(data);
                return next();
            }
            return next(new Error("用户登录信息已失效，请重新登录！"));
        });
    }else{
        return next(new Error("用户未登录！"));
    }
}

module.exports = checkLogin;