import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import cors from "cors";


const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["https://mook-f2b4e.web.app", "http://localhost:3000"],
  })
);
app.use(cookieParser());

//routers
app.use("/users", userRouter);

//Configure ENV file and Require Connection File
dotenv.config({ path: "./config.env" });


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

export default app;