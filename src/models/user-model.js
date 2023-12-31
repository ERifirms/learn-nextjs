import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  {
    timeseries: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
