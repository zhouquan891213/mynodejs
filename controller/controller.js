var confUtil = require("../common/conf/confUtil");

module.exports = function(req, res, next){
    var reqPath = req.path;
    console.log("请求path:" + req.path);
    var action = confUtil.getActionMapping(reqPath);
    if(action == null){
        return next(new Error("您请求的资源不存在！"));
    }
    var type = action.type;
    if(type == "require"){
        var requireObj = require(action.name);
        requireObj(req, res, next);
    }
}