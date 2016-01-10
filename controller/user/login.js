module.exports = function(req, res, next){
    var userName = req.param("userName");
    var password = req.param("password");
    if(!userName || !password){
        return next(new Error("用户名和密码不能为空！"));
    }
    if(userName == "zhouquan" && password == "zhouquan"){
        console.log("登录成功，登录用户名：" + userName);
        res.setHeader("Set-Cookie", "sessionId=zhouquan");
        return next();
    }
    return next(new Error("用户名或密码错误！"));
}