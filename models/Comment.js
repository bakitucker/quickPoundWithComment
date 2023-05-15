const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  madeBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postID: {
    type: String,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);