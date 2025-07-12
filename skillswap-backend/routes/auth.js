const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const router = express.Router()

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, name, email, password } = req.body
    const user = await User.create({ username, name, email, password })
    res.status(201).json({ message: "User created" })
  } catch (err) {
    res.status(400).json({ error: "Signup failed", details: err.message })
  }
})

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, username: user.username } })
})

module.exports = router
