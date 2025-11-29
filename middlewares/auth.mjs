import jwt from "jsonwebtoken";
import User from "../models/User.mjs";
export default async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const payload = jwt.verify(token, "this is my secret key");
    const user = await User.findById(payload.id);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send();
  }
};
