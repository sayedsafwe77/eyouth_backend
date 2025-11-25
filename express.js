import express from "express";
import { connect } from "mongoose";
import userRouter from "./routes/users.mjs";

connect("mongodb://127.0.0.1:27017/s9")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const app = express();

app.use(express.json());

// middleware
// app.use((req, res, next) => {
//   res.write("middleware 1");
//   next();
// });

// app.use((req, res, next) => {
//   res.write("middleware 2");
//   next();
// });
const serviceStopMiddleware = (req, res, next) => {
  res.status(403).send();
};
const serviceStopMiddleware2 = (req, res, next) => {
  next();
};

app.use("/users", serviceStopMiddleware, serviceStopMiddleware2, userRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(3000);
