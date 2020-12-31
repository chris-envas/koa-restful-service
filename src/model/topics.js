const mongoose = require("mongoose");
const { Schema, model } = mongoose
/**
 * @name  {String} 话题名称
 * @avatar_url  {String} 话题图片
 * @instroduction  {String} 简介
 */
const topicSchema = new Schema({
    _v: { type: Number, select: false },
    name: { type: String, required: true },
    avatar_url: { type: String },
    instroduction: { type: String, select: false },
})

module.exports = model("Topic", topicSchema)