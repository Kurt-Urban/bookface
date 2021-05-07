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

profileRouter.post("/friends/send", async (req, res) => {
  const { sender, recipient } = req.body;
  const { senderId } = sender;
  const { receivingId } = recipient;
  try {
    User.findOneAndUpdate(
      { profileId: senderId },
      { $push: { sentRequests: recipient } },
      (error) => {
        if (error) console.log(error);
      }
    );
    User.findOneAndUpdate(
      { profileId: receivingId },
      { $push: { friendRequests: sender } },
      (error) => {
        if (error) console.log(error);
      }
    );
    res.status(200);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: { msgbody: "Error, Check Console", msgError: true } });
  }
});

profileRouter.post("/friends/cancel", async (req, res) => {
  const { sender, recipient } = req.body;
  const { senderId } = sender;
  const { receivingId } = recipient;
  try {
    User.findOneAndUpdate(
      { profileId: senderId },
      { $pull: { sentRequests: recipient } },
      (error) => {
        if (error) console.log(error);
      }
    );
    User.findOneAndUpdate(
      { profileId: receivingId },
      { $pull: { friendRequests: sender } },
      (error) => {
        if (error) console.log(error);
      }
    );
    res.status(200);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: { msgbody: "Error, Check Console", msgError: true } });
  }
});

profileRouter.post("/friends/accept", async (req, res) => {
  const { accepter, sender } = req.body;
  try {
    User.findOneAndUpdate(
      { profileId: accepter.profileId },
      {
        $pull: { friendRequests: { senderId: sender.profileId } },
        $push: { friends: sender },
      },
      (error) => {
        if (error) console.log(error);
      }
    );
    User.findOneAndUpdate(
      { profileId: sender.profileId },
      {
        $pull: { sentRequests: { receivingId: accepter.profileId } },
        $push: { friends: accepter },
      },
      (error) => {
        if (error) console.log(error);
      }
    );
    console.log("Accepted");
    res.status(200);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: { msgbody: "Error, Check Console", msgError: true } });
  }
});

module.exports = profileRouter;
