import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// seat number unique
// Screens
const CinemaSchema = new Schema({});

const Cinema = model("cinemas", CinemaSchema);

export default Cinema;
