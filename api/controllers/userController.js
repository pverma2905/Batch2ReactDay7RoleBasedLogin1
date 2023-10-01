const User = require("../models/userSchema");
const moment = require("moment");
const jwt = require("jsonwebtoken");

var bcrypt = require("bcryptjs");

const userpost = async (req, res) => {
  const { firstname, email, password, mobile, gender, role } = req.body;

  if (!firstname || !email || !password || !mobile || !gender || !role) {
    res.status(400).json({ error: "All Input Is required" });
  }

  try {
    const isEmail = await User.findOne({ email: email });
    if (isEmail) {
      res
        .status(400)
        .json({ error: "This user already exist in our database" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const obj = {
        firstname: req.body.firstname,
        email: req.body.email,
        password: hashedPassword,
        //image:req.files,
        mobile: req.body.mobile,
        gender: req.body.gender,
        role: req.body.role,
        dateCreated: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      };

      const userData = new User(obj);

      await userData.save();
      res.status(201).json(userData);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log("catch block error");
  }
};

const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json({ error: "UserId not found" });
  }
};

const deleteUser = async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const user = await User.findOne({ _id: id });
  if (user) {
    await User.findOneAndDelete({ _id: id });
    res.status(200).json("Successfully Deleted");
  } else {
    res.status(400).json({ error: "UserId not found" });
  }
};

const updatedUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });
  if (user) {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    // const users = await User.find();
    res.status(200).json(updatedUser);
  } else {
    res.status(400).json({ error: "UserId not found" });
  }
};

// const passwordUpdate = async (req, res) => {};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const is_exist = await User.findOne({ email: email });
    if (is_exist) {
      const password_match = await bcrypt.compare(password, is_exist.password);
      // const token_data = await createToken(is_exist.id);
      const token_data = jwt.sign(
        { _id: is_exist.id },
        process.env.secret_key,
        {
          expiresIn: "1h",
        }
      );

      if (password_match) {
        // const user_data = {
        //   // _id: is_exist._id,
        //   // name: is_exist.firstname,
        //   // email: is_exist.email,
        //   // mobile: is_exist.mobile,
        //   // type: is_exist.gender,
        //   // token: token_data,
        // };
        const user_data = {
          role: is_exist.role,
          token: token_data

        };
        res.status(200).send({ success: true, data: user_data });
      } else {
        res.status(401).send({ success: false, message: "Invalid Login" });
      }
    } else {
      res.status(401).send({ success: false, message: "Invalid Login" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// const createToken = async (id) => {
//   try {
//     const tokren = await jwt.sign({ _id: id }, config.secret_key, {
//       expiresIn: "1h",
//     });
//     return tokren;
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

// const forgetPassword = async (req, res) => {};

module.exports = {
  userpost,
  getUsers,
  getSingleUser,
  deleteUser,
  updatedUser,
  // passwordUpdate,
  loginUser,
  // forgetPassword,
};
