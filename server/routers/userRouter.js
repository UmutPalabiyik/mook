import express from "express";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import tokenModel from "../models/tokenSchema.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, repassword } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ message: "There is already a user with this email address." });
    }

    if (password !== repassword) {
      return res.status(400).json({ message: "password verification failed." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3m",
      }
    );

    const refreshToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.REFRESH_TOKEN
    );

    await tokenModel.create({
      userId: user._id,
      refreshToken,
    });

    res.status(200).json({ user, accessToken });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "The email didn't match our records.Please check again.",
      });
    }

    const isPasswordVerify = await bcrypt.compare(password, user.password);

    if (!isPasswordVerify) {
      return res.status(400).json({
        message: "The password didn't match our records.Please check again.",
      });
    }

    const accessToken = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3m",
      }
    );

    const refreshToken = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.REFRESH_TOKEN
    );

    await tokenModel.findOneAndUpdate(
      { userId: user._id },
      { refreshToken },
      {
        new: true,
      }
    );

    res.status(200).json({ user, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/logout/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await tokenModel.findOneAndUpdate(
      {
        userId: id,
      },
      {
        refreshToken: null,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Logout succesfull" });
  } catch (error) {
    res.status(500).json(error, "Logout error");
  }
});

router.get("/refresh/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { refreshToken } = await tokenModel.findOne({ userId: id });
    if (!refreshToken) return res.status(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err) return res.status(403).json(err);

      const accessToken = jwt.sign(
        { email: decoded.email, id: decoded.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "3m" }
      );

      res.status(200).json(accessToken);
    });
  } catch (error) {
    console.log(err.message);
  }
});

export default router;
