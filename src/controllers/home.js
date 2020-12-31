const path = require("path")
class HomeCtl {
    index (ctx) {
        ctx.body = "别搞啊！年轻人，耗子尾汁。"
    }
    // 文件上传
    async upload (ctx) {
       const file = ctx.request.files.file;
       const basename = path.basename(file.path);
        ctx.body = {
            url: `${ctx.origin}/uploads/${basename}`
        };
    }
}

module.exports = new HomeCtl();