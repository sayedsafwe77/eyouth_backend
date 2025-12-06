import express from "express";
import Ticket from "../models/Ticket.mjs";
const router = express.Router();
router.post("/", async (req, res) => {
  const users = await Ticket.create();
  res.send(users);
});
