// 话题数据库模型
const Topic = require("../model/Topics");

class TopicsCtl {
    async find(ctx) {
        const { per_page = 10 } = ctx.query
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page * 1, 1);
        ctx.body = await Topic.find().limit(perPage).skip(page * perPage);
    }
    async findById(ctx) { 
        const { fields = "" } = ctx.query;
        const selectFields = fields.split(";").filter(f => f).map(f => " +" + f).join("");
        console.log(selectFields)
        const topic = await Topic.findById(ctx.params.id).select(selectFields);
        ctx.body = topic;
    }
    async create(ctx) {
        ctx.verifyParams({
            name: { type: "string", required: true },
            avatar_url: { type: "string", required: false },
            instroduction: { type: "string", required: false }
        })
        const repeateName = await Topic.find({ name: ctx.request.body.name });
        console.log(!repeateName.length, ctx.request.body.name)
        if(repeateName.length) ctx.throw(409, `${ctx.request.body.name}已存在`);
        const topic = new Topic(ctx.request.body).save();
        ctx.body = topic;
    }
    async update(ctx) {
        ctx.verifyParams({
            name: { type: "string", required: false },
            avatar_url: { type: "string", required: false },
            instroduction: { type: "string", required: false },
        })
        const topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        ctx.body = topic;
    }
}

module.exports = new TopicsCtl();