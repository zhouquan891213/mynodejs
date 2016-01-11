var confUtil = require("../common/conf/confUtil");

module.exports = function(req, res, next){
    var reqPath = req.path;
    console.log("请求path:" + req.path);
    var action = confUtil.getActionMapping(reqPath);
    if(action == null){
        return next(new Error("您请求的资源" + reqPath + "不存在！"));
    }
    var type = action.type;
    if(type == "require"){
        var requireObj = require(action.name);
        var method = req.method;
        console.log("当前请求METHOD:" + method);
        if(method == "GET"){
            requireObj(req.query, req, res, next);
        }else if(method == "POST"){
            requireObj(req.body, req, res, next);
        }else{
            requireObj(req.query, req, res, next);
        }
    }
}