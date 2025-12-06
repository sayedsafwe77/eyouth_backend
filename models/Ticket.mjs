import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const TicketSchema = new Schema({});

const Ticket = model("tickets", TicketSchema);

export default Ticket;

// Ticket -> belongs to -> User -> belongs to -> seat -> hasMany Snacks
