import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps : true,
  }
);

const User = mongoose.model("User", schema);
export default User;
