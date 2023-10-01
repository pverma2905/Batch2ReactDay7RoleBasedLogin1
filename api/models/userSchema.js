const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error("not valid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  // image: {
  //   type: String,
  //   required: true,
  // },
  mobile: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
  gender: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "InActive"],
    default: "Active",
  },
  dateCreated: Date,
  dateUpdated: Date,
  role: {
    type: String,
    enum: ["admin", "enduser", "reseller", "account_manager"],
    // default: "enduser",
  }
});

const User = new mongoose.model("users", userSchema);

module.exports = User;
