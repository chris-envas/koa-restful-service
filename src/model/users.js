const mongoose = require("mongoose");
const { Schema, model } = mongoose;
/**
 * 用户数据结构表
 * @name  {String} 用户名
 * @password  {String} 密码
 * @phone  {String}} 手机号码
 * @acatar_url  {String} 头像
 * @gender  {String} 性别
 * @headline  {String}} 标题
 * @locations  {String} 居住地
 * @business  {String} 从事行业
 * @employments  {Array} 就业公司
 * @educations  {Array} 毕业院校 专业 层次 入学时间 毕业时间
 * @following {Array} 粉丝
 */
const userSchema = new Schema({
    __v: { type: Number, select: false },
    name: { type: String, required: true},
    password: { type: String, required: true, select: true},
    phone: { type: String, default: null, select: false },
    acatar_url: { type: String },
    gender: { type: String, enum: ["male", "female"], default: "male", select: false },
    headline: { type: String, select: false },
    locations: { type: [{type: String}], select: false },
    business: { type: String, select: false },
    employments: { 
        type: [{
            company: { type: String },
            job: { type: String }
        }], 
        select: false
    },
    educations: {
        type: [{
            school: { type: String },
            major: { type: String },
            diploma: { type: Number, enum: [1,2,3,4,5] },
            entrance_year: { type: Number },
            graduation_year: { type: Number }
        }],
        select: false
    },
    // Schema.Types.ObjectId 是由mongoose提供的特殊ID数据类型，用于存储id, ref用于后期引用
    following: {
        type: [{ type: Schema.Types.ObjectId, ref: "User"}],
        select: false
    }
})

// 导出数据库用户模型
module.exports = model("User", userSchema)