import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// seat number unique
// Screens
const ScreenSchema = new Schema({});

const Screen = model("screens", ScreenSchema);

export default Seat;

// Ticket -> belongs to -> User -> belongs to -> seat -> hasMany Snacks
