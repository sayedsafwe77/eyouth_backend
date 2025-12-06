import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  birth_year: { type: Number },
  email: { type: String, required: true },
  avatar: { type: String },
});

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }
  return user;
};

UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id.toString() }, process.env.SECRET_KEY);
};

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;

  userObject.avatar = userObject.avatar
    ? `${process.env.BASE_URL}/uploads/${userObject.avatar}`
    : null;
  return userObject;
};
const User = model("users", UserSchema);

export default User;
