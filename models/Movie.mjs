import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// seat number unique
// Screens
const MovieSchema = new Schema({
  cinema_id: [{ type: Schema.Types.ObjectId, ref: "cinemas" }],
});

const Movie = model("movies", MovieSchema);
export default Movie;
