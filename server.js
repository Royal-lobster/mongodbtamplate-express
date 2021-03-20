const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
let User = require("./models/user.model");

//middlewares
dotenv.config();
port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mongodb connect
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Mongodb is connected");
});

//routes
app.route("/").get((req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
  console.log("app has new visitor");
});

app.route("/").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    username,
    password,
  });

  newUser
    .save()
    .then(() => res.json("User Added"))
    .catch((err) => res.status(400).json(`Got Error: ${err}`));
});

// app listen
app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
