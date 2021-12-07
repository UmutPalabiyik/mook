import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import cors from "cors";
import config from "./config.js";

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: config.ORIGIN }));
app.use(cookieParser());

//routers
app.use("/users", userRouter);

//Configure ENV file and Require Connection File
dotenv.config({ path: "./config.env" });

console.log(`NODE_ENV=${config.PORT}`);
console.log(config)


mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection is succesfull");
  })
  .catch((e) => {
    console.log("DB connection : ", e);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Run server
app.listen(process.env.PORT, () => {
  console.log("Server is listening");
});
