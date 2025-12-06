import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.mjs";
import userValidationSchema from "../validations/userValidation.mjs";
import loginValidationSchema from "../validations/loginValidation.mjs";
import auth from "../middlewares/auth.mjs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.originalname.slice(0, file.originalname.indexOf(".")) +
        "-" +
        uniqueSuffix +
        "." +
        file.mimetype.slice(file.mimetype.indexOf("/") + 1)
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};
const upload = multer({ storage, fileFilter });

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      await userValidationSchema.validateAsync(req.body);
      const userData = req.body;
      userData.password = await bcrypt.hash(userData.password, 10);
      userData.avatar = req.file?.filename;
      const user = await User.create(userData);
      res.status(201).send({ message: "User created", data: { user } });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ message: error.message });
  }
);

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
router.post("/login", async (req, res) => {
  try {
    await loginValidationSchema.validateAsync(req.body);
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send({ user, token: user.generateToken() });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
router.get("/profile", auth, async (req, res) => {
  // return this user
  return res.send(req.user);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).send({ message: "User not found" });
  }
  res.send(user);
});
export default router;
