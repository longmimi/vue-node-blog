const express = require('express')
const UserController = require('../api/user.js')
const router = express.Router()

UserController(router)

module.exports = router