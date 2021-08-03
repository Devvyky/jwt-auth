const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Product = require("../models/productModel");

exports.signup = async (req, res, next) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return res.json({
        status: "failed",
        message: "Email already exist",
      });
    }
    // hash incoming password from req.body
    password = await bcrypt.hash(password, 12);

    const newUser = { firstName, lastName, email, password };

    const createUser = await User.create(newUser);

    const id = createUser._id;
    // sign jwt token with user id as payload
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: `${process.env.JWT_EXPIRES_IN}`,
    });

    // push new user to dummy database

    res.status(201).json({
      status: "success",
      token,
      data: {
        id: createUser._id,
        firstName: createUser.firstName,
        lastName: createUser.lastName,
        email: createUser.email,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
    console.log(err);
  }

  next();
};

exports.updateInfo = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  try {
    if ((!firstName || !lastName || !email, !password)) {
      res.status(404).json({
        status: "failed",
        message: "Please enter all field",
      });
    }

    const validateUser = await User.findOne({ email });

    // hash incoming password from req.body
    password = await bcrypt.hash(password, 12);

    if (validateUser) {
      res
        .status(404)
        .json({ status: "failed", message: "Email already exist" });
    }

    const user = await User.findById(req.user.id);
    user.lastName = lastName;
    user.firstName = firstName;
    user.email = email;
    user.password = password;

    await user.save();

    res.json({
      status: "success",
      message: "Profile updated successfully",
    });
  } catch (error) {}
};

exports.getAllUser = async (req, res, next) => {
  try {
    console.log(req.user);
    const users = await User.find({});

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (err) {
    console.log(err);
  }
  next();
};

exports.getSingleUser = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user.id);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
  next();
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, desc } = req.body;

    const createProduct = { name, desc, user: req.user.id };

    await Product.create(createProduct);

    res.status(200).json({
      status: "success",
      data: createProduct,
    });
  } catch (err) {
    console.log(err);
  }
  next();
};
