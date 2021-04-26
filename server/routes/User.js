const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../libraries/passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (userId) => {
  return JWT.sign(
    {
      iss: "Kurban00",
      sub: userId,
    },
    "Kurban00",
    { expiresIn: "1h" }
  );
};

userRouter.post("/register", (req, res) => {
  const {
    email,
    password,
    role,
    firstName,
    lastName,
    posts,
    friends,
    releaseYear,
    genre,
    title,
    photos,
    profileImg,
  } = req.body;
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
      const newUser = new User({
        email,
        password,
        role,
        firstName,
        lastName,
        posts,
        friends,
        releaseYear,
        genre,
        title,
        photos,
        profileImg,
      });
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
      console.log(req.session);
      const { _id, email, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: false });
      res.status(200).json({ isAuthenticated: true, user: { email, role } });
    }
  }
);

userRouter.get("/logout", (req, res) => {
  req.logOut();
  res.clearCookie("access_token");
  res.json({ user: { username: "", role: "" }, success: true });
});

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.session);
    const { email, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { email, role } });
  }
);

module.exports = userRouter;
