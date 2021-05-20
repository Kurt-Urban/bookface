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
    const postDate = new Date(Date.now());
    const parsedPost = JSON.parse(post);
    if (req.file !== undefined) {
      parsedPost.img = req.file.filename;
    }
    parsedPost.date = postDate.toString();
    try {
      await User.findByIdAndUpdate(userId, {
        $push: { posts: parsedPost, photos: parsedPost.img },
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
  try {
    const { ID } = req.query;
    await User.findById(ID, (error, result) => {
      if (error) console.log(error);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: { msgbody: "Error, Check Console", msgError: true } });
  }
});

uploadRouter.delete("/delete", async (req, res) => {
  try {
    const { postId, postImg } = req.body;
    User.findOneAndUpdate(
      { "posts.id": postId },
      { $pull: { posts: { id: postId }, photos: postImg } },
      (error, doc) => {
        if (error) console.log(error);
        res.send("Deleted");
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: { msgbody: "Error, Check Console", msgError: true } });
  }
});

uploadRouter.put("/edit", async (req, res) => {
  try {
    const { id } = req.body;
    const body = req.body;
    User.findOneAndUpdate({ "posts.id": id }, { posts: body }, (error, doc) => {
      if (error) console.log(error);
      res.status(201);
      console.log(doc);
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: { msgbody: "Error, Check Console", msgError: true } });
  }
});

module.exports = uploadRouter;
