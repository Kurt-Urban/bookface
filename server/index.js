const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const env = require("dotenv").config().parsed;
const passport = require("passport");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const path = require("path");

const userRouter = require("./routes/User");
const uploadRouter = require("./routes/Upload");

app.use(cors({ credentials: true }));
app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "images")));
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
app.use("/upload", uploadRouter);

app.listen(port, () => {
  console.log("Connected");
});
