import mongoose from "mongoose";

const tokenScheme = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  refreshToken: {
    type: String,
  },
});

export default mongoose.model("token", tokenScheme);
