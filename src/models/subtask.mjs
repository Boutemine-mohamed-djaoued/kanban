import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
  title : {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  }
});

export const subtask = mongoose.model("subtask", subtaskSchema);
