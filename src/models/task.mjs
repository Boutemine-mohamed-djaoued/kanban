import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subtasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subtask",
    },
  ],
});

export const task = mongoose.model("task", taskSchema);
