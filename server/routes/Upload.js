const express = require("express");
const multer = require("multer");
const uploadRouter = express.Router();
const User = require("../models/User");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image.", 400), false);
  }
};

const multerUpload = multer({ storage, fileFilter });

uploadRouter.post(
  "/post",
  multerUpload.single("imageFile"),
  async (req, res) => {
    const { userId, post } = req.body;
    const parsedPost = JSON.parse(post);
    if (req.file !== undefined) parsedPost.img = req.file.filename;
    try {
      await User.findByIdAndUpdate(userId, {
        $push: { posts: parsedPost },
      });
      res.status(201).json({ msgbody: "Submitted", msgError: false });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: { msgbody: "Error, Check Console", msgError: true } });
    }
  }
);

uploadRouter.get("/fetch/posts", async (req, res) => {
  const { ID } = req.query;
  try {
    await User.findById(ID, (error, result) => {
      if (error) res.send(error);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: { msgbody: "Error, Check Console", msgError: true } });
  }
});

//TESTING WITH MONGOOSE
// uploadRouter.put("/text", async (req, res) => {
//   const { email, post } = req.body;
//   try {
//     await User.findOneAndUpdate({ email }, { $push: { posts: post } });
//     res.status(201).json({ msgbody: "Submitted", msgError: false });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: { msgbody: "Error, Check Console", msgError: true } });
//   }
//ALTERNATE
// User.findOneAndUpdate({ email }, { $push: { posts: post } }, (error) => {
//   if (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: { msgbody: "Error has occured", msgError: true } });
//   } else {
//     res.status(201).json({ msgbody: "Submitted", msgError: false });
//   }
// });
// });

module.exports = uploadRouter;
