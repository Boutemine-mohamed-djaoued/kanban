import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
    },
  ],
});

export const user = mongoose.model("user", userSchema);
