const env = require("dotenv").config().parsed;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
// const User = require("./models/User");
const userRouter = require("./routes/User");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");

app.use(cors({ credentials: true }));
app.use(express.static("public"));
app.use(cookieParser("Kurban00"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "Kurban00", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(
    `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@cluster0.hxtev.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .catch((err) => console.log(err));

app.use("/user", userRouter);

app.listen(port, () => {
  console.log("Connected");
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// const upload = multer({ storage });
