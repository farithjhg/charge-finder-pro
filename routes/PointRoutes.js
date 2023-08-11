const express = require('express')
const router = express.Router()
const { getAllPoints } = require('../controller/OpenchargemapController')
const { protect } = require('../middleware/authMiddleware')
router.route('/').get(protect, getAllPoints)
module.exports = router