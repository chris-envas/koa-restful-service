# koa-restful最佳实践

> 这是一个关于RESTFUL的最佳实践，接口定义参照Github API标准
>
> 之所以采用koa，因其精小强悍，适合作为Node.js后端服务入门之选，且优秀的中间件机制，可快速扩展插件，自由灵活
>
> 在生产项目中，笔者推荐使用Egg.js、nest.js等企业级框架，采用统一的工程规范，无需关心基础架构才是上策！

之所以采用koa，因其精小强悍，适合作为Node.js后端服务入门之选，且优秀的中间件机制，可快速扩展插件，自由灵活

在真实的项目中，笔者依然推荐使用Egg.js、nest.js等企业级框架，采用统一的工程规范，无需关心基础架构才是上策！

项目中采用的中间件：

- koa-body - 用于解析请求实体，不仅支持常规表单等参数解析，还支持文件上传等多种格式
- koa-json-error - 支持以json方式返回的错误信息，并支持堆栈信息等酷炫方式
- koa-parameter - 用于koa请求参数校验，自动挂载于`ctx.verifyParams`

- koa-router - koa社区使用最广泛的路由模块
- koa-static - 静态资源托管
- jsonwebtoken - 快速生成加密令牌`token`
- koa-jwt - 基于`jsonwebtoken`的jwt权限验证中间件
- mongoose - 用于Node.js的mogoDB对象模型关联工具
- nodemon - 监听文件，实时调试工具

API接口：

- 用户

  - 用户登录 
  - 用户注册
  - 更新用户
  - 删除用户

  - 获取用户列表 - 支持分页 (page, per_page)
    - /users/userID?page=1&per_page=10  - 第一页 10条数据
  - 获取指定用户 - 支持选择性查找字段（fileds) 支持话题模块引用
    - /users/userID?fields=employments;locations

- 关注

  - 关注用户
  - 取消关注
  - 关注人列表
  - 粉丝列表

- 话题

  - 创建话题
  - 获取指定话题 - 支持选择性查找字段（fileds）
  - 更新话题
  - 获取话题列表 - 支持分页 (page, per_page)，支持模糊搜索(q)
  - 话题关注
  - 取消话题关注

- 其他

  - 文件上传

认证

- JWT认证

数据库

- MongoDB - 基于MongoDB提供

