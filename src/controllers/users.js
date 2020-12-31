const jwt = require("jsonwebtoken");
// 用户数据库模型
const User = require("../model/users");
// jwt密钥字段
const { secret } = require("../config");

class UserCtl {
    // 获取全部用户
    async find(ctx) {
        const { per_page = 10 } = ctx.query
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page * 1, 1);
        ctx.body = await User.find().limit(perPage).skip(page * perPage);
    }
    // 获取指定用户
    async findById (ctx) {
        const { fields = " " } = ctx.query;
        let selectFields = ""
        selectFields = fields.split(";").filter(f => f).map(f => " +"+f).join("");
        const user = await User.findById(ctx.params.id).select(selectFields);
        if(!user) ctx.throw(404);
        ctx.body = user;
    }
    // 创建用户
    async create (ctx) {
        ctx.verifyParams({
            name: { type: "string", required: true},
            password: { type: 'string', required: true }
        });
        const { name } = ctx.request.body;
        const repeatedUser = await User.findOne({ name });
        if (repeatedUser) ctx.throw(409, `${name}已被占用`);
        const user = await new User(ctx.request.body).save();
        ctx.body = user;
    }
    // 更新指定用户
    async update (ctx) {
        ctx.verifyParams({
            name: { type: "string", required: false},
            password: { type: 'string', required: false },
            avatar_url: { type: 'string', required: false },
            gender: { type: 'string', required: false },
            headline: { type: 'string', required: false },
            locations: { type: 'array', itemType: "string", required: false },
            business: { type: 'string', required: false },
            employments: { type: 'array', itemType: "object", required: false },
            edcations: { type: 'array', itemType: "object", required: false },
        });
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if(!user) ctx.throw(404,"用户不存在");
        ctx.body = user;
    }
    // 删除用户
    async delete (ctx) {
        const user = await User.findByIdAndRemove(ctx.params.id);
        if(!user) ctx.throw(404,"用户不存在");
        ctx.status = 204;
    }
    // 用户登录 =》下发令牌token
    async login (ctx) {
        ctx.verifyParams({
            name: { type: "string", required: true},
            password: { type: 'string', required: true }
        });
        const user = await User.findOne(ctx.request.body);
        if(!user) ctx.throw(401, "用户名或密码不正确")
        const { _id, name } = user
        // 签名
        const token = jwt.sign({ _id, name }, secret, { expiresIn: "1d" });
        ctx.body = {
            token
        };
    }
    // 关注用户
    async follow (ctx) {
        const me = await User.findById(ctx.state.user._id).select("+following");
        if(!me.following.map(id => id.toString()).includes(ctx.params.id)) {
            me.following.push(ctx.params.id);
            me.save();
        }
        ctx.status = 204;
    }
    // 取消关注
    async unfollow (ctx) {
        const me = await User.findById(ctx.state.user._id).select("+following");
        const index = me.following.map(id => id.toString()).indexOf(ctx.params.id);
        if(index > -1) {
            me.following.splice(index, 1);
            me.save();
        }
        ctx.status = 204;
    }
    // 关注的人
    async listFollowing (ctx) {
        const user = await User.findById(ctx.params.id).select("+following").populate("following");
        if (!user) ctx.throw(404, '用户不存在');
        ctx.body = user.following
    }
    // 粉丝列表
    async listFollowers(ctx) {
        // 查询所有用户中 following 包含 ctx.params.id 的用户: 粉丝
        const users = await User.find({ following: ctx.params.id });
        ctx.body = users;
    }
}

module.exports = new UserCtl()