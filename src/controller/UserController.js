

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const {userService} = require('../service')


// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, family } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await userService.findUserByEmail(email)

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await userService.save({
    name,
    email,
    family,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await userService.findUserByEmail(email)

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      family: user.family,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/check-token
// @access  Public
const checkToken = asyncHandler(async (req, res) => {
    // Get token from body
    const { token } = req.body

  // Check for user email
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // Get user from the token
    req.user = await User.findById(decoded.id).select('-password')
    res.status(200)
    next()
  } catch (error) {
    console.log(error)
    res.status(401)
    throw new Error('Not authorized')
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  checkToken,
  getMe,
}
