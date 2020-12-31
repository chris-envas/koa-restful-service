const koa = require("koa");
const mongoose = require("mongoose");
const parameter = require("koa-parameter");
const error = require("koa-json-error");
const koaBody = require("koa-body");
const { connectionStr } = require("./config");
const app = new koa();
const routting = require("./router/index");
const path = require("path");
const koaStatic = require("koa-static");
/**
 *   @connectionStr {string} 数据库链接    
 *   @useNewUrlParser {boolean} mongoose当前版本建议参数
 *   @useUnifiedTopology {boolean} mongoose当前版本建议参数
 *   git: https://github.com/Automattic/mongoose
 */ 
mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('mongodb is connected');
})
mongoose.connection.on("error", console.error)
// 静态资源
app.use(koaStatic(path.join(__dirname, "public")))
/**
 * 低级错误处理
 * @postFormat  {function} 返回值过滤
 */
app.use(error({
    postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest } 
}))
/**
 * 解析请求实体部分 - 文件支持
 *  @multipart  {boolean} 文件格式支持
 *  @formidable  {object} 可选对象
 *  @uploadDir  {string}}} 上传目录路径
 *  @keepExtensions  {boolean} 图片格式支持 扩展
 *  git: https://github.com/dlau/koa-body
 */
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, "/public/uploads"),
        keepExtensions: true
    }
}))
// 解析请求参数
app.use(parameter(app))
// 循环注册路由
routting(app) 
// 启动服务
app.listen(3000, () => {
    console.log("service is running " + process.pid);
})
 