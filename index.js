const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
//Mongoose
const keys = require("./config/keys");
const mongoose = require("mongoose");
mongoose.connect(keys.mongoDB).then(() => {
  console.log("connectovan");
});
//Models
require("./Models/Korisnik");
//Passport
const passport = require("passport");
app.use(passport.initialize());
require("./config/passportConfig")(passport);
//BodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Routes
const signUp = require("./Routes/SignUp");
app.use("/signUp", signUp);
const LogIn = require("./Routes/LogIn");
app.use("/LogIn", LogIn);
//App routes
app.get("/", (req, res) => {
  res.send("alooo");
});
app.get(
  "/passport",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.send("radi passport");
  }
);
//Socket io
io.on("connect", () => {
  console.log("connectovan");
});
//Port
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log("App listening on port 5000!");
});
