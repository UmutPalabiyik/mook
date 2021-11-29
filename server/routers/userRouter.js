import express from "express";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import tokenModel from "../models/tokenSchema.js";

const router = express.Router();

router.post("/register", async (req, res) => {
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
        {email: user.email, id: user._id},
        process.env.REFRESH_TOKEN
    );

    await tokenModel.create({
        userId: user._id,
        refreshToken
    });

    res.status(200).json({user, accessToken});

  } catch (error) {
      console.log("blablasdasdasd", error)
  }
});

export default router;