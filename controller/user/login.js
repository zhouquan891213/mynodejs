var redisUtil = require("../../common/redis/redisUtil");

module.exports = function(param, req, res, next){
    var userName = param.userName;
    var password = param.password;
    if(!userName || !password){
        return next(new Error("用户名和密码不能为空！"));
    }
    if(userName == password){
        console.log("登录成功，登录用户名：" + userName);
        res.setHeader("Set-Cookie", "sessionId=" + userName);
        req.userInfo = {
            userName : userName,
            password : password
        }
        redisUtil.set(userName, JSON.stringify(req.userInfo));
        var retObj = {
            flag : true,
            message : "登录成功，当前用户：" + userName
        }
        res.write(JSON.stringify(retObj));
        res.end();
        return;
    }
    return next(new Error("用户名或密码错误！"));
}