const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
require("../libraries/passport");

const signToken = (userId) => {
  return JWT.sign(
    {
      iss: "bookface-app",
      sub: userId,
    },
    "bookface-app",
    { expiresIn: "3h" }
  );
};

userRouter.post("/register", (req, res) => {
  const { email } = req.body;
  const userBody = req.body;
  User.findOne({ email }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgbody: "Error has occured", msgError: true } });

    if (user)
      res.status(400).json({
        message: { msgbody: "Email already in use.", msgError: true },
      });
    else {
      const newUser = new User(userBody);
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgbody: "Error has occured", msgError: true },
          });
        else {
          res.status(201).json({
            message: { msgbody: "Account created.", msgError: false },
          });
        }
      });
    }
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id } = req.user;
      const userBody = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: false });
      res.status(200).json({
        isAuthenticated: true,
        user: userBody,
      });
    }
  }
);

userRouter.get("/logout", (req, res) => {
  req.logOut();
  res.clearCookie("access_token");
  res.json({
    isAuthenticated: false,
    user: { username: "", role: "" },
    success: true,
  });
});

userRouter.get(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userBody = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: userBody,
    });
  }
);

module.exports = userRouter;
