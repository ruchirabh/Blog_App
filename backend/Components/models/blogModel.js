const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const interactionSchema = new mongoose.Schema({
  comment: {
    type: [String],
  },
  like: {
    type: Number,
    default: 0,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
const Interaction = mongoose.model("Interaction", interactionSchema);

module.exports = { Blog, Interaction };
