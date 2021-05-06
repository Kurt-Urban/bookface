const express = require("express");
const profileRouter = express.Router();
const User = require("../models/User");

profileRouter.get("/fetch/user", async (req, res) => {
  const { userid } = req.headers;
  try {
    await User.findOne(
      { profileId: userid },
      "-password -_id -role -__v",
      (error, result) => {
        if (error) res.send(error);
        res.status(200).send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: { msgbody: "Error, Check Console", msgError: true } });
  }
});

profileRouter.get("/fetch/users", async (req, res) => {
  try {
    await User.find({}, "-password", (error, docs) => {
      if (error) res.send(error);
      res.send(docs);
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: { msgbody: "Error, Check Console", msgError: true } });
  }
});

module.exports = profileRouter;
