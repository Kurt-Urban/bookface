const env = require("dotenv").config().parsed;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const User = require("./User");
const multer = require("multer");

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@cluster0.hxtev.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

// const upload = multer({ storage });

const userInput = {
  email: "kurban@gmail.com",
  password: "CodingIsHard123",
  role: "admin",
};

// user.save((err, doc) => {
//   if (err) console.log(err);
//   console.log(doc);
// });

app.post("/auth/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) console.log(err);
    console.log(doc);
    res.send(doc);
  });
  console.log();
});

app.listen(port, () => {
  console.log("Connected");
});
