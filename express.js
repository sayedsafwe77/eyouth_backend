import express from "express";
import { connect } from "mongoose";
import userRouter from "./routes/users.mjs";
import "dotenv/config";

connect(process.env.DB_CONNECTION)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
// middleware
// app.use((req, res, next) => {
//   res.write("middleware 1");
//   next();
// });

// app.use((req, res, next) => {
//   res.write("middleware 2");
//   next();
// });
// password encryption
// authentication

app.use("/users", userRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(3000);
