import express from "express";
import User from "../models/User.mjs";
import userValidationSchema from "../validations/userValidation.mjs";
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).send({ message: "User not found" });
  }
  res.send(user);
});

router.post("/", async (req, res) => {
  try {
    await userValidationSchema.validateAsync(req.body);
    const user = await User.create(req.body);
    res.status(201).send({ message: "User created", data: { user } });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    upsert: true,
  });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  res.status(200).send({ user });
});
router.delete("/:id", async (req, res) => {
  const result = await User.deleteOne({ _id: req.params.id });
  if (result.deletedCount === 0) {
    return res.status(404).send({ message: "User not found" });
  }
  res.status(204).send();
});
export default router;
