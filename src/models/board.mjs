import mongoose from "mongoose";
const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  columns: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "column",
    },
  ],
});

export const board = mongoose.model("board", boardSchema);
