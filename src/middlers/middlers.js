const User = require("../model/users")

// 检验权限 防止越权
const checkOwner = async (ctx, next) => {
    if(ctx.params.id !== ctx.state.user._id) ctx.throw(403, "此操作无权限")
    await next();
}
exports.checkOwner = checkOwner;

// 判断用户ID是否存在
const checkUserExist = async (ctx, next) => {
    const user = await User.findById(ctx.params.id);
    if (!user) ctx.throw(404, "用户不存在");
    await next();
}

exports.checkUserExist = checkUserExist;