const mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');


const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

autoIncrement.initialize(mongoose.connection);
PostSchema.plugin(autoIncrement.plugin, 'posts')

module.exports = Post = mongoose.model("posts", PostSchema);
