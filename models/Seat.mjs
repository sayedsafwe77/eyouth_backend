import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// seat number unique
// Screens
const SeatSchema = new Schema({});

const Seat = model("seats", SeatSchema);

export default Seat;

// Ticket -> belongs to -> User -> belongs to -> seat -> hasMany Snacks
