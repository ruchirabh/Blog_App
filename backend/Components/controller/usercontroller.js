const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");


router.post("/signup", async (req, res) => {
  const { username, email } = req.body;

  try {
    var password = req.body.password;
    password = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send("done");
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error in the server" });
  }
});

router.post("/validate", async (req, res) => {
  const { email } = req.body;

  try {
    var password = req.body.password;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "try to sign up" });
    }

    res.status(200).send("exists");
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Server Error" });
  }
});

router.patch("/reset", async (req, res) => {
  const { username, email, newPassword } = req.body;

  try {
    const user = await User.findOne({ username, email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.password = newPassword;

    await user.save();

    console.log(`Password updated for user: ${username}`);
    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ msg: "Server error, please try again later" });
  }
});

module.exports = router;
