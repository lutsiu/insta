import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { validateSignUpStep1 } from "../validations/authentification.ts";
import randomNumber from "../utils/generateRandomNumber.ts";
import User from "../models/User.ts";
import { restorePassword, sendMail } from "../utils/nodemailer.ts";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/check-email-uniqueness", async (req: Request, res: Response) => {
  try {
    const { email } = req.body as { email: string };
    const emailIsUsed = await User.findOne({ email });
    if (emailIsUsed) {
      return res.status(409).json({
        errorField: "email",
        message: "Another account is using the same email.",
      });
    } else {
      return res.status(200).json("User can use this email");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(
  "/check-username-uniqueness",
  async (req: Request, res: Response) => {
    try {
      const { userName } = req.body as { userName: string };
      const userNameIsUsed = await User.findOne({ userName });
      if (userNameIsUsed) {
        return res.status(409).json({
          errorField: "email",
          message: "Another account is using the same user name.",
        });
      } else {
        return res.status(200).json("User can use this user name");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.post(
  "/sign-up-step-1",
  validateSignUpStep1,
  async (req: Request, res: Response) => {
    try {
      // errors check
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, userName, fullName, password, dateOfBirth } = req.body as {
        email: string;
        userName: string;
        fullName: string;
        password: string;
        dateOfBirth: string;
      };
      // encripting password
      const salt = await bcrypt.genSalt(12);
      const encryptedPassword = await bcrypt.hash(password, salt);

      // generating random number to confirm email
      const confirmationCode = randomNumber;
      sendMail(email, confirmationCode);
      // creating new user
      const user = new User({
        email,
        password: encryptedPassword,
        userName: userName.trim().toLowerCase(),
        fullName,
        dateOfBirth,
        confirmationCode,
      });
      await user.save();
      return res.status(201).json(user._id);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.delete("/delete-user-data/:userName", async (req, res) => {
  try {
    const { userName } = req.params;
    await User.findOneAndDelete({ userName });
    return res.status(204).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/check-confirmation-code", async (req, res) => {
  try {
    const { _id, confirmationCode } = req.body as {
      _id: string;
      confirmationCode: string;
    };
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json("User wasn't found");
    }
    const confirmationCodeMatches =
      user.confirmationCode?.toString() === confirmationCode;
    if (!confirmationCodeMatches) {
      return res
        .status(409)
        .json("This code is invalid. Try it again or request new one");
    }
    user.confirmationCode = undefined;
    user.userIsVerified = true;
    await user.save();
    return res.status(201).json("Registration is finished successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/resend-code", async (req, res) => {
  try {
    const { _id } = req.body as { _id: string };
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json("User wasn't found");
    }
    // create new confirmation code
    const newCode = randomNumber;
    sendMail(user.email, newCode, true);
    // save data
    user.confirmationCode = newCode;
    await user.save();
    return res.status(200).json("Code was send again");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/send-restore-password-link", async (req, res) => {
  try {
    const { email } = req.body as { email: string };
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("No user with this email was found");
    }

    // creation of token
    const resetToken = Math.random().toString(36).substring(7);

    // save data
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000;
    user.userIsVerified = false;
    await user.save();
    // send email
    restorePassword(user.email, user.resetToken, user.id);

    res.status(200).json("Reset email sent successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/change-password", async (req, res) => {
  try {
    const { id, resetToken, password } = req.body as {
      id: string;
      resetToken: string;
      password: string;
    };

    // find user
    const user = await User.findOne({
      _id: id,
      resetToken,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).json("Invalid or expired reset token");
    }

    // hash password
    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // save data
    user.password = encryptedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    user.userIsVerified = true;
    await user.save();

    res.status(200).json("Password reset successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req,res) => {
  try {
    const {userNameOrEmail, password} = req.body as {userNameOrEmail: string; password: string};
    let queryField: "userName" | "email";

    if (userNameOrEmail.includes(".com") && userNameOrEmail.includes("@")) {
      queryField = "email";
    } else {
      queryField ="userName";
    }

    const user = await User.findOne({[queryField] : userNameOrEmail});

    if (!user) {
      return res.status(404).json("Credentials are wrong");
    }
    
    const passwordsMatching = await  bcrypt.compare(password, user.password);

    if (!passwordsMatching) {
      return res.status(404).json("Credentials are wrong");
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string);
    user.token = token;
    await user.save();
    res.status(200).json({user});
  } catch (err) {
    res.status(500).json(err);
  }
})
export default router;
