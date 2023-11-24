import { body } from "express-validator";

export const validateSignUpStep1 = [
  body("email")
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address"),
  body("fullName")
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "Full name must contain at least 2 characters and maximum 50 characters"
    ),
    body('userName').notEmpty()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "Username must contain at least 2 characters and maximum 40 characters"
    ),
    body('password').notEmpty().trim().isLength({min: 8}).withMessage("Password must containt at least 8 characters")
];
