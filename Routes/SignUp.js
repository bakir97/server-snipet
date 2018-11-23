const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Korisnik = mongoose.model("korisnik");
const bcrypt = require("bcryptjs");
router.post("/", async (req, res) => {
  const korisnikUsername = await Korisnik.findOne({
    username: req.body.username
  });
  const errors = {};
  if (korisnikUsername) {
    errors.username = "Username vec postoji";
  }
  const korisnikEmail = await Korisnik.findOne({ email: req.body.email });
  if (korisnikEmail) {
    error.email = "Email vec postoji";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }
  const podaci = {};
  podaci.username = req.body.username;
  podaci.email = req.body.email;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const hashSecret = await bcrypt.hash(req.body.secretKey, salt);
  podaci.password = hashPassword;
  podaci.secretKey = hashSecret;
  const noviKorisnik = await new Korisnik(podaci);
  noviKorisnik.save();
  return res.status(200).json(noviKorisnik);
});

module.exports = router;
