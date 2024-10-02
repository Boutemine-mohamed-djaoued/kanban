import mongoose from "mongoose";
const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
  ],
});

export const column = mongoose.model("column", columnSchema);