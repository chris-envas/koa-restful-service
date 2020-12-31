// 循环挂载路由中间件
const fs = require("fs");
module.exports = (app) => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file !== "index.js") {
            const route = require(`./${file}`);
            app.use(route.routes()).use(route.allowedMethods());
        }
    });
}