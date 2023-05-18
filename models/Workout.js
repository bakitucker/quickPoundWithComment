const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  workOutName: {
    type: String,
    required: true,
  },
  bodyPart: {
    type: String,
    require: true,
  },
  weight: {
    type: Number,
    require: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Workout", WorkoutSchema);