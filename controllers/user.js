const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const expressJwt = require("express-jwt");
const { response, Router } = require("express");

exports.getUser = (req, res) => {
  const user = User.find().then((result) => {
    res.json({
      user: result,
    });
  });

  // .then( (result) => {
  //     res.json({
  //         user:result
  //     })
  // })
  // .catch(err => {
  //     console.log(err)
  // })
};

exports.createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
    });

    const user = await newUser.save();
    res.redirect("/afterRegister", {
      user: user,
    });
  } catch (err) {
    res.redirect("/error");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        error: "Email not found",
      });
    } else {
      const validate = await bcrypt.compare(req.body.password, user.password);
      if (!validate) {
        res.status(400).json({
          error: "Email and password doesn't match",
        });
      } else {
        return res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(500).json({ error: "500 server error" });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signed out successfull",
  });
};

//Update
exports.updateUser = async (req, res) => {
  if (req.body.userId == req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, //everything erequested
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your accoung");
  }
};
