const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const router = express.Router();

const User = require("../models/user");

// PUT // auth/signup
router.put(
  "/signup",
  [
    body("name").trim().not().isEmpty(),
    body("password").trim().isLength({ min: 5 }),
    body("birthday").isISO8601(),
    body("address").trim().isLength({ min: 10 }),
    body("phone")
      .trim()
      .isLength({ min: 10, max: 10 })
      .custom(async (value, { req }) => {
        const checkPhone = await User.getPhoneCustomer(value);
        if (checkPhone.length !== 0) {
          return Promise.reject("Phone already exists !");
        }
      }),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value, { req }) => {
        const checkEmail = await User.getEmailCustomer(value);
        if (checkEmail.length !== 0) {
          return Promise.reject("E-Mail address already exists !");
        }
      })
      .normalizeEmail(),
  ],
  authController.signup
);

// GET / auth/login
router.post("/login", authController.login);

module.exports = router;