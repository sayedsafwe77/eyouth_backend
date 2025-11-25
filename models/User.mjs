import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  birth_year: { type: Number },
  email: { type: String, required: true },
});
const User = model("users", UserSchema);
export default User;
