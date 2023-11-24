import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { validateSignUpStep1 } from "../validations/authentification.ts";
import randomNumber from "../utils/generateRandomNumber.ts";
import User from "../models/User.ts";
import { sendMail } from "../utils/nodemailer.ts";
const router = express.Router();

router.post(
  "/sign-up/step-1",
  validateSignUpStep1,
  async (req: Request, res: Response) => {
    try {
      // errors check
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, userName, fullName, password } = req.body as {
        email: string;
        userName: string;
        fullName: string;
        password: string;
      };

      const emailIsUsed = await User.findOne({ email });
      const userNameIsUsed = await User.findOne({ userName });
      if (emailIsUsed) {
        return res.status(409).json({
          errorField: "email",
          message: "Another account is using the same email.",
        });
      }
      if (userNameIsUsed) {
        return res.status(409).json({
          errorField: "userName",
          message: "Another account is using the same user name",
        });
      }
      // encripting password
      const salt = await bcrypt.genSalt(12);
      const encryptedPassword = await bcrypt.hash(password, salt);

      // generating random number to confirm email
      const confirmationCode = randomNumber;
      sendMail(email, confirmationCode);
      const user = new User({
        email,
        password: encryptedPassword,
        userName: userName.trim().toLowerCase(),
        fullName,
        confirmationCode,
      });
      await user.save();
      return res.status(201).json(user._id);
    } catch (err) {
      res.status(404).json(err);
    }
  }
);

export default router;
