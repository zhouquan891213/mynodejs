module.exports = function(req, res, next){
    var userName = req.param("userName");
    var password = req.param("password");
    if(!userName || !password){
        return next(new Error("用户名和密码不能为空！"));
    }
    if(userName == password){
        console.log("登录成功，登录用户名：" + userName);
        res.setHeader("Set-Cookie", "sessionId=" + userName);
        var retObj = {
            flag : true,
            message : "登录成功，当前用户：" + userName
        }
        res.write(JSON.stringify(retObj));
        res.end();
    }
    return next(new Error("用户名或密码错误！"));
}