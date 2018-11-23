const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Korisnik = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    secretKey: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
mongoose.model("korisnik", Korisnik);
